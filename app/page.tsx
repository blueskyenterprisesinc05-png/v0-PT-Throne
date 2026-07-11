"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Menu,
  ClipboardCheck,
  Ruler,
  Wrench,
  Activity,
  BatteryCharging,
  Sun,
  Check,
  Star,
  Zap,
  ArrowRight,
  ChevronDown,
  Bot,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import { LeadCaptureModal } from "@/components/lead-capture-modal"
import { VoiceflowWidget } from "@/components/voiceflow-widget"

// Learn More Modal
function LearnMoreModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const reasons = [
    {
      title: "Engineering-First Approach",
      description: "Unlike typical solar companies, we're led by certified engineers who analyze 47 data points before recommending a system.",
    },
    {
      title: "No Salespeople, No Pressure",
      description: "Our consultations focus on data and your specific needs—not aggressive sales tactics or inflated promises.",
    },
    {
      title: "25-Year Performance Guarantee",
      description: "We stand behind our systems with comprehensive warranties and ongoing monitoring support.",
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees or surprise costs. You see the full breakdown before signing anything.",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Why Choose Zenith Solar?</DialogTitle>
          <DialogDescription>
            Here's what sets us apart from the competition.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{reason.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Navigation Component
function Navigation({ onOpenModal }: { onOpenModal: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#method", label: "The Method" },
    { href: "#features", label: "System Features" },
    { href: "#pricing", label: "Investment Paths" },
    { href: "#ai-advisor", label: "AI Advisor" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-slate-900/80 border-b border-white/10 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-semibold text-white tracking-tight">
          Zenith<span className="text-orange-500">Solar</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA + Mobile Menu */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onOpenModal}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
          >
            Get Started
          </Button>

          {/* Mobile Hamburger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900 border-slate-800">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

// Hero Section
function HeroSection({ onOpenModal, onLearnMore }: { onOpenModal: () => void; onLearnMore: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
          <Zap className="h-4 w-4" />
          Engineering-First Solar Solutions
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance max-w-4xl mx-auto">
          Stop Renting Your Power.{" "}
          <span className="text-orange-500">Own Your Energy.</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto text-pretty">
          Precision-engineered solar systems designed by certified engineers. 
          No salespeople. No gimmicks. Just science-backed energy independence.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onOpenModal}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
          >
            Start Your Engineering Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onLearnMore}
            className="border-slate-500 bg-transparent text-white hover:bg-slate-800/80 hover:text-white text-lg px-8 py-6 shadow-none"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "2,847", label: "Systems Deployed" },
            { value: "99.2%", label: "Uptime Rate" },
            { value: "25yr", label: "Warranty" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// The Thorne Method Section
function MethodSection() {
  const methods = [
    {
      icon: ClipboardCheck,
      title: "Engineering Audit",
      description:
        "Comprehensive structural analysis including load calculations, irradiance mapping, and electrical infrastructure assessment. We evaluate 47 data points before presenting a solution.",
    },
    {
      icon: Ruler,
      title: "Custom Design",
      description:
        "CAD-drafted system layouts optimized for your specific roof geometry and shading profile. Every panel placement is calculated for maximum annual yield.",
    },
    {
      icon: Wrench,
      title: "Precision Install",
      description:
        "NABCEP-certified installation crews following strict QA protocols. Torque specifications, wire management, and commissioning verified at 12 checkpoints.",
    },
  ]

  return (
    <section id="method" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">THE THORNE METHOD</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Engineering Excellence at Every Stage
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Our systematic approach eliminates guesswork and ensures optimal system performance for decades.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {methods.map((method, index) => (
            <Card
              key={method.title}
              className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <method.icon className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-slate-500">0{index + 1}</span>
                  <CardTitle className="text-white">{method.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 leading-relaxed">
                  {method.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Bento Grid Features Section
function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">SYSTEM FEATURES</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Technology That Performs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Smart Monitoring - Large Card */}
          <Card className="md:col-span-2 lg:col-span-2 bg-slate-900 border-slate-700 overflow-hidden">
            <CardHeader className="pb-0">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-white text-2xl">Smart Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <CardDescription className="text-slate-400 text-base leading-relaxed">
                Real-time performance analytics with panel-level monitoring. Track production, 
                consumption, and grid export from any device. Automatic fault detection alerts 
                you before issues impact output. Our ML algorithms predict maintenance needs 
                based on weather patterns and degradation curves.
              </CardDescription>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {["Panel-Level Data", "Predictive Alerts", "Mobile App"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Battery Backup */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <BatteryCharging className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-white">Battery Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400 leading-relaxed">
                LFP chemistry batteries rated for 6,000+ cycles. Seamless grid-independent 
                operation during outages. Configurable backup priorities and time-of-use optimization.
              </CardDescription>
            </CardContent>
          </Card>

          {/* TopCon Panels */}
          <Card className="md:col-span-2 lg:col-span-3 bg-slate-900 border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-white text-2xl">TOPCon Panel Technology</CardTitle>
                <CardDescription className="text-slate-400 text-base leading-relaxed mt-4">
                  N-type tunnel oxide passivated contact cells delivering 22.5%+ efficiency. 
                  Superior low-light performance and temperature coefficient. Bifacial design 
                  captures reflected light for up to 10% additional yield.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <div className="grid grid-cols-2 gap-6 w-full">
                  {[
                    { value: "22.5%", label: "Panel Efficiency" },
                    { value: "0.29%/°C", label: "Temp Coefficient" },
                    { value: "30yr", label: "Performance Warranty" },
                    { value: "N-Type", label: "Cell Technology" },
                  ].map((spec) => (
                    <div key={spec.label} className="text-center p-4 rounded-lg bg-slate-800">
                      <p className="text-2xl font-bold text-orange-500">{spec.value}</p>
                      <p className="text-xs text-slate-500 mt-1">{spec.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection({ onOpenModal }: { onOpenModal: () => void }) {
  const plans = [
    {
      name: "Cash Purchase",
      description: "Maximum long-term savings",
      price: "$18,500",
      priceNote: "Average system cost after federal tax credit",
      features: [
        "30% Federal Tax Credit",
        "Immediate ownership",
        "Highest ROI over 25 years",
        "No monthly payments",
        "Full warranty coverage",
      ],
      highlight: false,
    },
    {
      name: "Solar Loan",
      description: "Own your system from day one",
      price: "$89/mo",
      priceNote: "Typical 20-year term at 5.99% APR",
      features: [
        "30% Federal Tax Credit eligible",
        "Build equity immediately",
        "Fixed monthly payments",
        "Own after payoff",
        "Transferable to new owner",
      ],
      highlight: true,
    },
    {
      name: "PPA",
      description: "Zero upfront, immediate savings",
      price: "$0.12/kWh",
      priceNote: "Locked rate for 25 years",
      features: [
        "No upfront cost",
        "Day-one savings",
        "Maintenance included",
        "Performance guaranteed",
        "Purchase option available",
      ],
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">INVESTMENT PATHS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Choose Your Path to Energy Independence
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Three proven financing structures. Each engineered to maximize your return.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.highlight
                  ? "bg-gradient-to-b from-orange-500/10 to-slate-900 border-orange-500/50"
                  : "bg-slate-800/50 border-slate-700"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="py-4">
                  <p className="text-4xl font-bold text-white">{plan.price}</p>
                  <p className="text-sm text-slate-500 mt-2">{plan.priceNote}</p>
                </div>
                <ul className="space-y-3 text-left mt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={onOpenModal}
                  className={`w-full mt-8 ${
                    plan.highlight
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  Get Custom Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Proven Results Section
function ProvenResultsSection() {
  const stats = [
    { value: "4.2 GWh", label: "Clean Energy Produced" },
    { value: "12,000", label: "Trees Planted Equivalent" },
    { value: "$2,850", label: "Avg. Annual Savings" },
  ]

  const testimonials = [
    {
      quote:
        "The engineering audit caught a structural issue my previous installer missed entirely. Zenith&apos;s methodical approach gave me confidence in every recommendation.",
      author: "Dr. Sarah Chen",
      location: "Austin, TX",
      rating: 5,
    },
    {
      quote:
        "As a structural engineer myself, I scrutinize everything. Their load calculations and mounting specifications met standards I rarely see in residential solar.",
      author: "Michael Torres, P.E.",
      location: "Denver, CO",
      rating: 5,
    },
    {
      quote:
        "Three years in and my system is producing 4% above projections. The monitoring dashboard keeps me informed without being overwhelming.",
      author: "Jennifer Walsh",
      location: "Phoenix, AZ",
      rating: 5,
    },
  ]

  return (
    <section id="results" className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">PROVEN RESULTS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Engineered Performance, Measured Impact
          </h2>
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 p-8 rounded-2xl bg-slate-900/50 border border-slate-700">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-orange-500">{stat.value}</p>
              <p className="text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-slate-900 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <Check className="h-3 w-3" />
                    Verified Homeowner
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Sub-component for individual guides to isolate state
function TechnicalGuideCard({ guide }: { guide: { title: string; subtitle: string; excerpt: string; content: string } }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="bg-slate-900 border-slate-700 hover:border-orange-500/50 transition-colors flex flex-col justify-between">
      <CardHeader>
        <span className="text-xs font-mono text-orange-500 uppercase tracking-wider">{guide.subtitle}</span>
        <CardTitle className="text-white mt-2 text-xl">{guide.title}</CardTitle>
        <CardDescription className="text-slate-400 mt-4 leading-relaxed">
          {guide.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-orange-500 hover:text-orange-400 flex items-center gap-2 py-2 cursor-pointer text-left outline-none"
        >
          {expanded ? "Hide Article" : "Read Full Article"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`} />
        </button>
        
        <div className={`grid transition-all duration-300 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="text-slate-300 text-sm leading-relaxed pt-4 border-t border-slate-800">
              {guide.content}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Technical Guides & Resources Section for SEO/GEO
function TechnicalGuidesSection() {
  const guides = [
    {
      title: "2026 Solar Tax Credits & Incentives Guide",
      subtitle: "Federal & State Incentives",
      excerpt: "The Residential Clean Energy Credit allows you to deduct 30% of your solar installation costs from your federal taxes. Learn about battery storage eligibility, rollover rules, and state-specific rebates.",
      content: "Under Section 25D of the Internal Revenue Code, homeowners can claim a 30% tax credit for solar PV systems, battery storage (with a capacity of 3 kWh or greater), and associated wiring/racking. This credit has been extended at 30% through 2032. If your tax liability is lower than the credit amount, the remaining credit rolls over to the next tax year. In states like Texas, Colorado, and Arizona, local utilities offer additional performance-based incentives and net-metering credits that stack with the federal credit."
    },
    {
      title: "TOPCon vs. PERC Solar Technology Comparison",
      subtitle: "N-Type vs. P-Type Performance",
      excerpt: "TOPCon (Tunnel Oxide Passivated Contact) is the new standard in solar efficiency. Discover why N-type cells outperform traditional P-type PERC panels in efficiency, temperature coefficient, and degradation.",
      content: "TOPCon technology represents a major architectural leap over legacy PERC (Passivated Emitter and Rear Cell) panels. By placing an ultra-thin silicon oxide tunnel layer and heavily doped polycrystalline silicon on the rear side of the cell, TOPCon minimizes electron recombination losses. This results in panel efficiencies exceeding 22.5% compared to PERC's 20-21% limit. Furthermore, TOPCon panels have a temperature coefficient of -0.29%/°C (retaining more power in high heat) and show near-zero Light Induced Degradation (LID)."
    }
  ]

  return (
    <section id="resources" className="py-24 bg-slate-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            <ClipboardCheck className="h-4 w-4" />
            Engineering Data Verified: June 2026
          </div>
          <p className="text-orange-500 font-medium mb-3">TECHNICAL RESOURCES</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            In-Depth Engineering Guides
          </h2>
          <p className="mt-4 text-slate-400">
            Learn the science and financial modeling behind modern solar infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {guides.map((guide) => (
            <TechnicalGuideCard key={guide.title} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Objection Removal FAQ Section
function ObjectionRemovalSection() {
  const faqs = [
    {
      question: "Do solar panels damage your roof structure during installation?",
      answer:
        "No. When designed by certified structural engineers to ASCE 7 load calculations with proper torque limits and flashed penetrations, solar mounting systems do not compromise roof integrity. Our audit evaluates decking integrity, rafter spacing, and remaining roof life. If your roof has less than 10 years remaining, we reroof first or we don't install. Every mounting point is sealed with industry-standard flashing that actually improves weather resistance at those locations.",
    },
    {
      question: "How much solar electricity do panels produce on cloudy days?",
      answer:
        "Between 10% and 25% of peak capacity. Modern N-Type TOPCon panels capture solar photons through dense cloud cover, and our design yields are modeled using 30-year local TMY3 weather profiles (Typical Meteorological Year). Your annual production estimate already factors in average cloudy days for your location. The technology is highly viable—Germany, with weather comparable to Seattle, is the fourth-largest solar market globally.",
    },
    {
      question: "What is the typical return on investment (ROI) payback period for solar?",
      answer:
        "Between 5 and 7 years for cash purchases, and immediate cash-flow positive for solar loans. The exact payback depends on local utility rates and sun exposure. For cash purchases in regions with $0.14+/kWh rates and good sun exposure, expect 15-20% annual returns thereafter. Our engineering audit provides a detailed 25-year cash flow projection using your actual utility data, local incentives, and equipment degradation curves. No assumptions—just math.",
    },
    {
      question: "What is the degradation rate of TOPCon solar panels?",
      answer:
        "Less than 0.4% annually over a 30-year performance warranty. N-Type TOPCon cells resist Light Induced Degradation (LID) and Light and elevated Temperature Induced Degradation (LeTID) far better than legacy P-type PERC cells. This ensures your system maintains over 87% of its initial nameplate output even after three decades of operation.",
    },
    {
      question: "How does time-of-use (TOU) optimization work with battery backup?",
      answer:
        "By storing solar energy during off-peak hours and discharging it during high-tariff periods. Zenith's smart energy systems automate this switching to minimize utility expenses. The system dynamically monitors utility rates and household demand, storing excess solar generation in high-cycle LFP batteries for discharge when grid power is most expensive.",
    },
  ]

  return (
    <section id="faq" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">OBJECTION REMOVAL</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            {"Let's Address Your Concerns Directly"}
          </h2>
          <p className="mt-4 text-slate-400">
            Engineering answers backed by data, not sales pitches.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-6"
            >
              <AccordionTrigger className="text-white hover:text-orange-500 text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// Footer Section
function FooterSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [email, setEmail] = useState("")

  const handleQuickAudit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onOpenModal()
      setEmail("")
    }
  }

  return (
    <footer className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Left: Logo + Tagline */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Zenith<span className="text-orange-500">Solar</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Engineering a brighter, independent grid.
            </p>
          </div>

          {/* Center: Links */}
          <div className="flex flex-col items-start md:items-center gap-3">
            <a
              href="#resources"
              className="text-slate-400 hover:text-orange-500 transition-colors"
            >
              Tax Credit Guide 2026
            </a>
            <a
              href="#method"
              className="text-slate-400 hover:text-orange-500 transition-colors"
            >
              How it Works
            </a>
          </div>

          {/* Right: Quick Audit Form */}
          <div className="flex flex-col items-start md:items-end">
            <p className="text-white font-medium mb-3">Quick Audit</p>
            <form onSubmit={handleQuickAudit} className="flex gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 md:w-48"
              />
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-shadow"
              >
                Start
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Zenith Solar. Engineering excellence in every installation.</p>
        </div>
      </div>
    </footer>
  )
}

// AI Solar Advisor Section
function AISolarAdvisorSection() {
  const features = [
    { icon: <MessageCircle className="h-5 w-5 text-orange-400" />, text: "Answers any solar question instantly, 24/7" },
    { icon: <Sparkles className="h-5 w-5 text-orange-400" />, text: "Collects your home details & energy usage" },
    { icon: <Zap className="h-5 w-5 text-orange-400" />, text: "Sends a personalised quote estimate by email" },
  ]

  const handleOpenChat = () => {
    if (typeof window !== "undefined" && window.voiceflow?.chat) {
      window.voiceflow.chat.open()
    }
  }

  return (
    <section id="ai-advisor" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium">
              <Bot className="h-4 w-4" />
              Powered by AI
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Get Your Solar Quote in{" "}
                <span className="text-orange-500">Minutes,</span> Not Days
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our AI solar advisor works around the clock to answer your questions,
                understand your energy needs, and send you a custom quote — all in one conversation.
              </p>

              <ul className="space-y-4 mb-10">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      {f.icon}
                    </div>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <button
                id="open-ai-chat-btn"
                onClick={handleOpenChat}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all duration-300"
              >
                <Bot className="h-5 w-5" />
                Chat with Our AI Advisor
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                {/* Pulse ring */}
                <span className="absolute -inset-1 rounded-xl bg-orange-500/30 animate-ping opacity-30" />
              </button>
            </div>

            {/* Right visual card */}
            <div className="relative">
              {/* Glowing card */}
              <div className="relative rounded-2xl border border-orange-500/20 bg-slate-900/80 backdrop-blur-md p-6 shadow-[0_0_60px_rgba(249,115,22,0.15)]">
                {/* Chat preview header */}
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700/60 mb-4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                      <Sun className="h-5 w-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-slate-900" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Zenith AI Solar Advisor</p>
                    <p className="text-green-400 text-xs">Online · Typically replies instantly</p>
                  </div>
                </div>

                {/* Sample chat bubbles */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sun className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-300 max-w-xs">
                      Hi! 👋 I'm your AI solar advisor. What appliances do you run daily?
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <div className="bg-orange-500/90 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-white max-w-xs">
                      A fridge, 4 ACs, TV, and lights — I have a 3-bedroom home.
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sun className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-300 max-w-xs">
                      Great! Based on that load, I'd estimate a 10kW system. Let me gather a few more details to send your free quote...
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                      <Sun className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="mt-4 flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3 border border-slate-700/60">
                  <span className="text-slate-500 text-sm flex-1">Type your message...</span>
                  <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -top-4 -right-4 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm font-medium">4.9 / 5 satisfaction</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="text-white text-sm font-medium">Quote in &lt; 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Landing Page
export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.woflbillion.com.ng"

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        "name": "Zenith Solar",
        "url": siteUrl,
        "logo": `${siteUrl}/icon.svg`,
        "image": `${siteUrl}/placeholder.jpg`,
        "description": "Stop renting your power. Own your energy with precision-engineered solar systems designed by certified engineers.",
        "telephone": "",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "addressCountry": "US"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Texas" },
          { "@type": "AdministrativeArea", "name": "Colorado" },
          { "@type": "AdministrativeArea", "name": "Arizona" }
        ]
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service`,
        "name": "Zenith Solar Engineering Audit",
        "provider": {
          "@id": `${siteUrl}/#organization`
        },
        "description": "Comprehensive structural analysis including load calculations, irradiance mapping, and electrical infrastructure assessment."
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do solar panels damage your roof structure during installation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. When designed by certified structural engineers to ASCE 7 load calculations with proper torque limits and flashed penetrations, solar mounting systems do not compromise roof integrity. Our audit evaluates decking integrity, rafter spacing, and remaining roof life."
            }
          },
          {
            "@type": "Question",
            "name": "How much solar electricity do panels produce on cloudy days?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Between 10% and 25% of peak capacity. Modern N-Type TOPCon panels capture solar photons through dense cloud cover, and our design yields are modeled using 30-year local TMY3 weather profiles (Typical Meteorological Year)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the typical return on investment (ROI) payback period for solar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Between 5 and 7 years for cash purchases, and immediate cash-flow positive for solar loans. The exact payback depends on local utility rates and sun exposure."
            }
          },
          {
            "@type": "Question",
            "name": "What is the degradation rate of TOPCon solar panels?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Less than 0.4% annually over a 30-year performance warranty. N-Type TOPCon cells resist Light Induced Degradation (LID) far better than legacy P-type PERC cells."
            }
          },
          {
            "@type": "Question",
            "name": "How does time-of-use (TOU) optimization work with battery backup?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "By storing solar energy during off-peak hours and discharging it during high-tariff periods. Zenith's smart energy systems automate this switching to minimize utility expenses."
            }
          }
        ]
      }
    ]
  }

  return (
    <main className="min-h-screen bg-slate-900 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation onOpenModal={() => setModalOpen(true)} />
      <LeadCaptureModal open={modalOpen} onOpenChange={setModalOpen} />
      <LearnMoreModal open={learnMoreOpen} onOpenChange={setLearnMoreOpen} />
      <HeroSection onOpenModal={() => setModalOpen(true)} onLearnMore={() => setLearnMoreOpen(true)} />
      <MethodSection />
      <FeaturesSection />
      <PricingSection onOpenModal={() => setModalOpen(true)} />
      <ProvenResultsSection />
      <TechnicalGuidesSection />
      <ObjectionRemovalSection />
      <AISolarAdvisorSection />
      <FooterSection onOpenModal={() => setModalOpen(true)} />
      <VoiceflowWidget />
    </main>
  )
}
