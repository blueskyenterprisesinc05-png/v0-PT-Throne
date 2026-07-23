"use client"

import Script from "next/script"
import { trackEvent } from "@/lib/analytics"

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: Record<string, unknown>) => void
        open: () => void
        close: () => void
      }
    }
  }
}

export function VoiceflowWidget() {
  return (
    <Script
      id="voiceflow-widget"
      strategy="afterInteractive"
      src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
      type="text/javascript"
      onLoad={() => {
        if (window.voiceflow?.chat) {
          // Custom Voiceflow Extension to handle the WhatsApp handoff action
          const WhatsAppHandoffExtension = {
            name: "whatsapp_handoff",
            type: "response",
            match: ({ trace }: any) =>
              trace.type === "ext_whatsapp_handoff" || trace.payload?.name === "whatsapp_handoff",
            render: ({ trace, element }: any) => {
              const payload = trace.payload || {}

              let parsedData: any = {}
              try {
                parsedData = typeof payload === "string" ? JSON.parse(payload) : payload
              } catch (e) {
                // Ignore parse errors
              }

              const systemStr = parsedData?.system || parsedData?.payload?.system || "Recommended System"
              const batteryStr = parsedData?.battery || parsedData?.payload?.battery || "Recommended Battery"

              trackEvent("Planner Completed", { source: "Voiceflow Extension", system: systemStr, battery: batteryStr })

              // This extension renders silently, without a UI component in the chat
              element.innerHTML = ""
            },
          }

          window.voiceflow.chat.load({
            verify: { projectID: "6a6157573f60f442c6367c81" },
            url: "https://general-runtime.voiceflow.com",
            render: {
              mode: "overlay",
            },
            autostart: false, // We'll let the user click "Start Planning" to trigger the flow
            variables: {
              source_page: window.location.href,
            },
            assistant: {
              extensions: [WhatsAppHandoffExtension],
            },
          })
        }
      }}
    />
  )
}
