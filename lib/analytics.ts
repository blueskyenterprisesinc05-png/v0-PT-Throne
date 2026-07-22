export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === "undefined") return

  // In a real production app, this would route to PostHog, Google Analytics, Mixpanel, etc.
  // For the prototype, we log to the console with styling to make it easy to verify.
  const timestamp = new Date().toISOString()
  
  console.group(`📊 Analytics Event: ${eventName}`)
  console.log(`Timestamp: ${timestamp}`)
  if (properties) {
    console.log("Properties:", properties)
  }
  console.groupEnd()

  // Example integration placeholder:
  // if (window.posthog) {
  //   window.posthog.capture(eventName, properties)
  // }
}
