import { NextRequest, NextResponse } from "next/server"
import { auditRoadmapSchema } from "@/lib/audit-roadmap-schema"
import { persistAuditLead } from "@/lib/supabase/audit-leads"

function getWebhookUrl(): string | undefined {
  const raw = process.env.N8N_WEBHOOK_URL
  if (!raw) return undefined
  return raw.trim().replace(/^["']|["']$/g, "")
}

function n8nErrorMessage(status: number): string {
  if (status === 404) {
    return "n8n did not receive the request. Activate the workflow (production URL) or click “Listen for test event” in n8n right before submitting."
  }
  if (status === 403 || status === 401) {
    return "n8n rejected the request. Check N8N_WEBHOOK_SECRET matches your workflow auth settings."
  }
  return "Submission failed"
}

export async function POST(req: NextRequest) {
  const webhookUrl = getWebhookUrl()
  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL is not configured")
    return NextResponse.json({ error: "Service unavailable" }, { status: 500 })
  }

  if (process.env.NODE_ENV === "development" && webhookUrl.includes("webhook-test")) {
    console.warn(
      "[audit-roadmap] N8N_WEBHOOK_URL uses webhook-test — only works while n8n is listening. Use the production /webhook/ URL (same as Vercel) for local dev.",
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = auditRoadmapSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const { website, ...data } = parsed.data
  if (website?.trim()) {
    return NextResponse.json({ ok: true })
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  const secret = process.env.N8N_WEBHOOK_SECRET
  if (secret) {
    headers.Authorization = `Bearer ${secret}`
  }

  const referer = req.headers.get("referer") ?? undefined
  const payload = {
    ...data,
    source: data.source ?? "zenith-solar-audit",
    submittedAt: new Date().toISOString(),
    referer,
  }

  const supabaseResult = await persistAuditLead(
    { ...data, source: payload.source },
    referer,
  )
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const hasRealServiceRoleKey = serviceRoleKey && !serviceRoleKey.startsWith("your-")

  // Log DB failures but never block — always forward the lead to n8n.
  if (!supabaseResult.ok && hasRealServiceRoleKey) {
    console.warn(
      "[audit-roadmap] Supabase insert failed (proceeding to n8n):",
      supabaseResult.error,
    )
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error("n8n webhook failed", res.status, webhookUrl.includes("webhook-test") ? "(test URL — is n8n listening?)" : "")
      return NextResponse.json({ error: n8nErrorMessage(res.status) }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("n8n webhook request error", err)
    return NextResponse.json({ error: "Submission failed" }, { status: 502 })
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
