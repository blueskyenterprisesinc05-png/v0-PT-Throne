"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
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
  Loader2,
  Zap,
  ArrowRight,
} from "lucide-react"

// Multi-Step Lead Capture Modal
function LeadCaptureModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    address: "",
    monthlyBill: [150],
    roofAge: "",
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      setStep(1)
    }, 3000)
  }

  const resetAndClose = (isOpen: boolean) => {
    if (!isOpen) {
      setStep(1)
      setIsLoading(false)
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            <p className="mt-4 text-lg font-medium">Running Engineering Audit...</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Analyzing your property specifications
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {step === 1 && "Where is the property?"}
                {step === 2 && "Energy Profile"}
                {step === 3 && "Contact Details"}
              </DialogTitle>
              <DialogDescription>
                Step {step} of 3
              </DialogDescription>
            </DialogHeader>

            {step === 1 && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State ZIP"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setStep(2)}
                  disabled={!formData.address}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <Label>Average Monthly Electric Bill: ${formData.monthlyBill[0]}</Label>
                  <Slider
                    value={formData.monthlyBill}
                    onValueChange={(value) =>
                      setFormData({ ...formData, monthlyBill: value })
                    }
                    min={50}
                    max={500}
                    step={10}
                    className="py-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roofAge">Roof Age (years)</Label>
                  <Input
                    id="roofAge"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.roofAge}
                    onChange={(e) =>
                      setFormData({ ...formData, roofAge: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setStep(3)}
                    disabled={!formData.roofAge}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Marcus Thorne"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="marcus@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email || !formData.phone}
                  >
                    Get My Audit
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Navigation Component
function Navigation({ onOpenModal }: { onOpenModal: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#method", label: "The Method" },
    { href: "#features", label: "System Features" },
    { href: "#pricing", label: "Investment Paths" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10">
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
function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
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

// Social Proof Section
function SocialProofSection() {
  const stats = [
    { value: "$4.2M", label: "Customer Savings This Year" },
    { value: "47 GWh", label: "Clean Energy Generated" },
    { value: "4.9/5", label: "Average Customer Rating" },
  ]

  const testimonials = [
    {
      quote:
        "The engineering audit revealed issues with my previous quotes that would have cost me thousands in suboptimal placement. Zenith&apos;s attention to detail is unmatched.",
      author: "Dr. Sarah Chen",
      role: "Homeowner, Austin TX",
      rating: 5,
    },
    {
      quote:
        "As a structural engineer myself, I was impressed by their load calculations and mounting specifications. They speak our language.",
      author: "Michael Torres, P.E.",
      role: "Homeowner, Denver CO",
      rating: 5,
    },
    {
      quote:
        "Three years in, my system is producing 4% above projections. The monitoring dashboard keeps me informed without being overwhelming.",
      author: "Jennifer Walsh",
      role: "Homeowner, Phoenix AZ",
      rating: 5,
    },
  ]

  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
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
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "Will solar panels damage my roof?",
      answer:
        "When installed correctly, solar panels actually protect your roof from weathering. Our engineering audit includes a comprehensive roof assessment. We use industry-leading mounting systems with flashed attachments that maintain roof integrity. If your roof needs replacement within the next 5-7 years, we&apos;ll recommend addressing that first to avoid reinstallation costs.",
    },
    {
      question: "What&apos;s the realistic ROI on a solar system?",
      answer:
        "ROI depends on your local utility rates, sun exposure, and financing choice. For a typical cash purchase in a sunny region with $0.15/kWh rates, expect payback in 6-8 years with 15-17% annual ROI thereafter. Loan and PPA options provide immediate monthly savings but extend the break-even timeline. We provide detailed 25-year financial projections in your engineering audit.",
    },
    {
      question: "How do you calculate system size?",
      answer:
        "We analyze 12 months of utility data, conduct satellite-based shading analysis, and apply location-specific irradiance data. We size for 100-110% offset to account for degradation and usage growth. Oversizing wastes money; undersizing leaves savings on the table. Our engineering approach finds the optimal balance.",
    },
    {
      question: "What happens during a power outage?",
      answer:
        "Standard grid-tied systems shut down during outages for utility worker safety. With our battery backup option, critical loads remain powered. We design backup systems based on your priority circuits—typically refrigeration, medical equipment, home office, and minimal HVAC. Full home backup is possible but rarely cost-effective.",
    },
    {
      question: "Are the federal tax credits really going away?",
      answer:
        "The 30% Investment Tax Credit (ITC) is locked in through 2032, then steps down to 26% in 2033 and 22% in 2034. Systems must be operational by December 31 of the tax year to qualify. We handle timeline management to ensure you capture the full credit.",
    },
  ]

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Common Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-6"
            >
              <AccordionTrigger className="text-white hover:text-orange-500 text-left">
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
function FooterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
  }

  return (
    <footer className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
          {/* Mission */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Zenith<span className="text-orange-500">Solar</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              We believe energy independence shouldn&apos;t require a leap of faith. 
              Our engineering-first approach replaces sales pressure with data-driven 
              recommendations. Every system we design is built to perform for decades.
            </p>
          </div>

          {/* Email Capture */}
          <div>
            <p className="text-white font-medium mb-3">Get solar insights delivered</p>
            <p className="text-sm text-slate-500 mb-4">
              Monthly engineering tips and industry updates. No spam.
            </p>
            {submitted ? (
              <p className="text-orange-500 font-medium">Thanks! Check your inbox.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Zenith Solar. Engineering excellence in every installation.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Landing Page
export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-slate-900 text-foreground">
      <Navigation onOpenModal={() => setModalOpen(true)} />
      <LeadCaptureModal open={modalOpen} onOpenChange={setModalOpen} />
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <MethodSection />
      <FeaturesSection />
      <PricingSection onOpenModal={() => setModalOpen(true)} />
      <SocialProofSection />
      <FAQSection />
      <FooterSection />
    </main>
  )
}
