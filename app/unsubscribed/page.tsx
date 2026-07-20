import type { Metadata } from "next"
import Link from "next/link"
import { MailX, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Unsubscribed | Zenith Solar",
  description:
    "You have been unsubscribed from Zenith Solar email communications.",
  robots: { index: false, follow: false },
}

export default function UnsubscribedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link
            href="/"
            className="text-xl font-semibold text-white tracking-tight"
          >
            Zenith<span className="text-orange-500">Solar</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-lg text-center">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            Email preferences updated
          </p>

          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
            <MailX className="h-8 w-8 text-orange-500" aria-hidden="true" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
            You&apos;ve been{" "}
            <span className="text-orange-500">unsubscribed</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 leading-relaxed text-pretty">
            You will no longer receive audit roadmap updates or marketing emails
            from Zenith Solar. This may take a few minutes to take effect across
            our systems.
          </p>

          <p className="mt-4 text-sm text-slate-500 leading-relaxed">
            Changed your mind? You can resubscribe anytime by completing a new
            audit request on our website.
          </p>

          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
            >
              <Link href="/">
                Return to Homepage
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            Engineering a brighter, independent grid.
          </p>
          <p className="mt-2 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Zenith Solar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
