"use client"

import Script from "next/script"

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: Record<string, unknown>) => void
        open: () => void
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
          window.voiceflow.chat.load({
            verify: { projectID: "6a523b283336c4c7e2617dab" },
            url: "https://general-runtime.voiceflow.com",
            voice: {
              url: "https://runtime-api.voiceflow.com",
            },
          })

          // Auto-open the chat widget after it finishes loading
          setTimeout(() => {
            if (window.voiceflow?.chat) {
              window.voiceflow.chat.open()
            }
          }, 1500)
        }
      }}
    />
  )
}
