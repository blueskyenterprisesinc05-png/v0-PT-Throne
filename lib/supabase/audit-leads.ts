import type { AuditRoadmapPayload } from "@/lib/audit-roadmap-schema"
import { createAdminClient } from "@/lib/supabase/admin"

export type AuditLeadInsert = {
  first_name: string
  last_name: string
  email: string
  phone: string | null
  address: string
  monthly_bill: number
  roof_age: string
  gdpr_consent: boolean
  source: string | null
  referer: string | null
}

export function toAuditLeadRow(
  data: AuditRoadmapPayload,
  referer?: string,
): AuditLeadInsert {
  return {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone ?? null,
    address: data.address,
    monthly_bill: data.monthlyBill,
    roof_age: String(data.roofAge),
    gdpr_consent: data.gdprConsent,
    source: data.source ?? null,
    referer: referer ?? null,
  }
}

export async function persistAuditLead(
  data: AuditRoadmapPayload,
  referer?: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createAdminClient()
  if (!supabase) {
    return { ok: false, error: "Supabase is not configured" }
  }

  const { error } = await supabase.from("audit_leads").insert(toAuditLeadRow(data, referer))

  if (error) {
    console.error("Supabase audit_leads insert failed", error.message)
    return { ok: false, error: error.message }
  }

  return { ok: true }
}
