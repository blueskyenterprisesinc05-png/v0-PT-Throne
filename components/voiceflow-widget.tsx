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
            match: ({ trace }: any) => {
              console.log("VOICEFLOW TRACE", trace)
              return true
            },
            render: ({ trace, element }: any) => {
              console.log("VOICEFLOW TRACE");
              console.log(trace);
              // Extract data passed from the Voiceflow Custom Action block
              // If none are provided, fallback to a generic message
              const payload = trace.payload || {}
              
              // We're parsing the variables passed from Voiceflow (expecting JSON string or object depending on VF version)
              let parsedData: any = {}
              try {
                parsedData = typeof payload === "string" ? JSON.parse(payload) : payload
              } catch (e) {
                // Ignore parse errors
              }

              // Voiceflow places custom action data inside a nested payload or direct properties depending on structure.
              // We'll safely check for system and battery strings.
              const systemStr = parsedData?.system || parsedData?.payload?.system || "Recommended System"
              const batteryStr = parsedData?.battery || parsedData?.payload?.battery || "Recommended Battery"

              trackEvent("Planner Completed", { source: "Voiceflow Extension", system: systemStr, battery: batteryStr })
              
              const message = `Hi Zenith Solar,\n\nI completed the Solar Planner.\n\nRecommended system:\n• ${systemStr}\n• ${batteryStr}\n\nI'm interested in discussing the next steps.`
              
              const waLink = "https://wa.me/2349135889758?text=" + encodeURIComponent(message)
              
              // Open WhatsApp in a new tab
              window.open(waLink, "_blank")
              
              // Optionally close the chat widget
              window.voiceflow.chat.close()
              
              // This extension renders silently, without a UI component in the chat
              element.innerHTML = ""
            },
          }

          window.addEventListener("message", (event) => {
            console.log("VOICEFLOW MESSAGE:", event.data);

            if (
              typeof event.data === "string" &&
              event.data.startsWith('{"type":"voiceflow:')
            ) {
              try {
                const data = JSON.parse(event.data);
                console.log("VOICEFLOW PARSED:", data);
              } catch (err) {
                console.error(err);
              }
            }
          });

          window.voiceflow.chat.load({
            verify: { projectID: "6a60a191305f406e497ac3c5" },
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
