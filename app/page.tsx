"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Check,
  Zap,
  ArrowRight,
  Bot,
  MessageCircle,
  Sparkles,
  Sun,
  ShieldCheck,
  TrendingDown,
  BatteryWarning,
  HelpCircle,
  Home,
  Building2,
  Factory,
  GraduationCap,
  Church,
  Hotel
} from "lucide-react"
import { LeadCaptureModal } from "@/components/lead-capture-modal"
import { VoiceflowWidget } from "@/components/voiceflow-widget"

// 1. Navigation
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
    { href: "#projects", label: "Projects" },
    { href: "#how-we-work", label: "How We Work" },
    { href: "#services", label: "Services" },
    { href: "#faq", label: "FAQ" },
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
        <a href="#" className="text-xl font-semibold text-white tracking-tight">
          Zenith<span className="text-orange-500">Solar</span>
        </a>

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

        <div className="flex items-center gap-3">
          <Button
            onClick={onOpenModal}
            className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
          >
            Get a Free Assessment
          </Button>

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
                <Button
                  onClick={() => {
                    setIsOpen(false)
                    onOpenModal()
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                >
                  Get a Free Assessment
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

// 2. Hero Section
function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const openChat = () => {
    if (typeof window !== "undefined" && window.voiceflow?.chat) {
      window.voiceflow.chat.open()
    } else {
      onOpenModal()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance max-w-4xl mx-auto">
          Every Solar System Begins With <span className="text-orange-500">Understanding Your Energy Needs.</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto text-pretty">
          We design solar systems that reduce generator dependence and provide reliable power for Nigerian homes and businesses.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onOpenModal}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
          >
            Get a Free Solar Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={openChat}
            className="border-slate-500 bg-slate-800/50 text-white hover:bg-slate-700 hover:text-white text-lg px-8 py-6 shadow-none"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Talk to AI Advisor
          </Button>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-400">
          <a href="tel:+234000000000" className="hover:text-white transition-colors flex items-center gap-2">
            Call Us
          </a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// 3. Common Problems We Solve
function CommonProblemsSection() {
  const problems = [
    { icon: TrendingDown, text: "My electricity bills keep increasing." },
    { icon: BatteryWarning, text: "My batteries don't last through the night." },
    { icon: ShieldCheck, text: "My generator runs all day." },
    { icon: HelpCircle, text: "I don't know what system size I actually need." },
    { icon: Zap, text: "I already have solar, but it isn't enough." },
  ]

  return (
    <section className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-center text-slate-400 font-medium mb-8">COMMON PROBLEMS WE SOLVE</p>
        <div className="flex flex-wrap justify-center gap-4">
          {problems.map((prob, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full px-5 py-3 text-slate-300 text-sm">
              <prob.icon className="h-4 w-4 text-orange-500" />
              "{prob.text}"
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 4. Why Zenith (The Zenith Difference)
function WhyZenithSection() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-orange-500 font-medium mb-3">WHY ZENITH</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              No two homes use electricity the same way.
            </h2>
            <p className="text-lg text-slate-400 mb-6 leading-relaxed">
              That's why we don't recommend a system until we understand yours. Every recommendation begins with measuring how your building actually uses electricity—not with choosing the most expensive equipment.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Battery recommendations are based on your usage patterns—not fixed packages.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>We design systems that optimize your lifetime cost, rather than maximizing your initial invoice.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />
            <h3 className="text-xl font-semibold text-white mb-6">Independent Trust Signals</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-bold">CAC</div>
                <div>
                  <p className="text-white font-medium">Registered Company</p>
                  <p className="text-sm text-slate-400">Corporate Affairs Commission</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-bold">WTY</div>
                <div>
                  <p className="text-white font-medium">Verified Warranties</p>
                  <p className="text-sm text-slate-400">Backed by manufacturer support</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-bold">★ 4.9</div>
                <div>
                  <p className="text-white font-medium">Client Reviews</p>
                  <p className="text-sm text-slate-400">Real feedback from actual installations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 5. What We Do (Services)
function ServicesSection() {
  const services = [
    { title: "Energy Audits", desc: "Understanding your electricity usage before any equipment is proposed." },
    { title: "System Design", desc: "Properly sizing systems to match your budget and load requirements." },
    { title: "Installation", desc: "Overseeing deployment to ensure safety and long-term reliability." },
    { title: "Maintenance", desc: "Fixing poorly installed systems, battery upgrades, and inspections." },
    { title: "Consulting", desc: "Independent advice before you make a significant solar investment." },
  ]

  return (
    <section id="services" className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">WHAT WE DO</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Expertise Across the Board</h2>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <Card key={i} className="bg-slate-900 border-slate-700 text-center hover:border-orange-500/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// 6. Who We Help (Markets)
function WhoWeHelpSection() {
  const markets = [
    { icon: Home, label: "Homes" },
    { icon: Building2, label: "Businesses" },
    { icon: GraduationCap, label: "Schools" },
    { icon: Hotel, label: "Hotels" },
    { icon: Church, label: "Churches" },
    { icon: Factory, label: "Factories" },
  ]

  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <span className="text-slate-400 font-medium">WHO WE HELP:</span>
          <div className="flex flex-wrap justify-center gap-8">
            {markets.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <m.icon className="h-5 w-5 text-slate-300" />
                </div>
                <span className="text-sm text-slate-400">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// 7. What Happens During Your Assessment
function AssessmentSection({ onOpenModal }: { onOpenModal: () => void }) {
  const deliverables = [
    "Energy usage review",
    "Recommended system size",
    "Battery capacity recommendation",
    "Estimated backup duration",
    "Equipment recommendations",
    "Estimated installation timeline",
    "Opportunity to ask questions",
  ]

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">What Happens During Your Assessment</h2>
              <p className="text-slate-400 mb-8">
                We provide clarity before you commit. Here is exactly what we will help you understand about your property.
              </p>
              <Button onClick={onOpenModal} className="bg-orange-500 hover:bg-orange-600 text-white">
                Request Assessment
              </Button>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
              <ul className="space-y-3">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 8. How We Work (Process)
function ProcessSection() {
  const steps = [
    { title: "Understand", desc: "We calculate how your building actually uses electricity." },
    { title: "Design", desc: "We size the system around your budget and backup needs." },
    { title: "Build", desc: "We oversee the installation to ensure quality and safety." },
    { title: "Support", desc: "We provide ongoing maintenance and system optimization." },
  ]

  return (
    <section id="how-we-work" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">HOW WE WORK</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">A Proven Methodology</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Every project follows the same process to ensure the system matches your needs—not a predefined package.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-slate-700" />
              )}
              <div className="relative z-10 bg-slate-900 border border-slate-700 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500 font-bold">
                {i + 1}
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 9. Featured Projects
function ProjectsSection() {
  const projects = [
    {
      location: "Lagos (Residential)",
      stats: { size: "15 kW", battery: "25 kWh", backup: "24 hrs", outcome: "₦450k/mo savings" },
      story: {
        problem: "Frequent grid collapses forced reliance on two diesel generators.",
        assessment: "Identified high starting loads from legacy AC units.",
        design: "Specified hybrid inverters capable of handling high surge currents.",
        installation: "Rerouted critical loads to a dedicated subpanel.",
        result: "Reduced generator usage from 12 hours/day to less than 1 hour/week."
      }
    },
    {
      location: "Abuja (Commercial)",
      stats: { size: "40 kW", battery: "60 kWh", backup: "10 hrs", outcome: "Uninterrupted operations" },
      story: {
        problem: "Server room downtime was costing the business clients.",
        assessment: "Measured peak load patterns during business hours vs overnight.",
        design: "Prioritized solar production for daytime cooling, batteries for night servers.",
        installation: "Seamless integration with existing automated transfer switches.",
        result: "Zero downtime reported over the last 14 months."
      }
    }
  ]

  return (
    <section id="projects" className="py-24 bg-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">PROOF OF PERFORMANCE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">Real problems solved with verifiable results.</p>
        </div>

        <div className="space-y-12">
          {projects.map((p, idx) => (
            <Card key={idx} className="bg-slate-900 border-slate-700 overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Stats Panel */}
                <div className="bg-slate-950 p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    {p.location}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-500 text-sm">System Size</span>
                      <span className="text-white font-medium text-sm">{p.stats.size}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-500 text-sm">Battery Capacity</span>
                      <span className="text-white font-medium text-sm">{p.stats.battery}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-500 text-sm">Backup Duration</span>
                      <span className="text-white font-medium text-sm">{p.stats.backup}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-orange-500 font-semibold text-sm">Main Outcome</span>
                      <span className="text-orange-400 font-medium text-sm text-right max-w-[120px]">{p.stats.outcome}</span>
                    </div>
                  </div>
                </div>
                
                {/* Story Panel */}
                <div className="md:col-span-2 p-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Problem</p>
                      <p className="text-sm text-slate-300">{p.story.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Assessment</p>
                      <p className="text-sm text-slate-300">{p.story.assessment}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Design</p>
                      <p className="text-sm text-slate-300">{p.story.design}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Installation</p>
                      <p className="text-sm text-slate-300">{p.story.installation}</p>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 mt-4">
                      <p className="text-xs font-bold text-orange-500 uppercase mb-1">Result</p>
                      <p className="text-sm text-orange-200">{p.story.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// 10. Technical FAQ
function FAQSection() {
  const faqs = [
    {
      q: "Should I buy batteries now or add them later?",
      a: "It depends on your current grid stability. If you face frequent outages, a hybrid inverter with batteries is essential now. If you have stable grid power but want to hedge against rising tariffs, you can start with a grid-tied system and retrofit batteries later. We assess this during our consultation."
    },
    {
      q: "Can solar replace my generator completely?",
      a: "Yes, but doing so requires properly sizing your battery bank for cloudy days and overnight usage. For heavy commercial loads, we often design solar to handle the baseline load and keep a smaller generator for emergency backup during prolonged bad weather. We model both scenarios for you."
    },
    {
      q: "Can I upgrade an existing, poorly performing system?",
      a: "Absolutely. We frequently audit existing installations. Often, the issue is undersized cabling, incorrect inverter settings, or depleted batteries. We can diagnose the bottleneck and propose a targeted upgrade path rather than replacing everything."
    },
    {
      q: "Do I need to replace my roof first?",
      a: "We conduct a roof integrity check before any installation. If your roof has less than 10 years of life remaining or shows structural weakness, we will advise repairing or replacing it before mounting panels to prevent costly removal and re-installation later."
    }
  ]

  return (
    <section id="faq" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium mb-3">PRACTICAL QUESTIONS</p>
          <h2 className="text-3xl font-bold text-white">What You Need to Know</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-slate-800/50 border border-slate-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-orange-500 text-left font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// 11. AI Solar Advisor Section (Kept as is, minor text tweaks to match promise)
function AISolarAdvisorSection() {
  const features = [
    { icon: <MessageCircle className="h-5 w-5 text-orange-400" />, text: "Answers your specific questions instantly, 24/7" },
    { icon: <Sparkles className="h-5 w-5 text-orange-400" />, text: "Collects details about your property & usage" },
    { icon: <Zap className="h-5 w-5 text-orange-400" />, text: "Recommends the right next steps for you" },
  ]

  const handleOpenChat = () => {
    if (typeof window !== "undefined" && window.voiceflow?.chat) {
      window.voiceflow.chat.open()
    }
  }

  return (
    <section id="ai-advisor" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium">
              <Bot className="h-4 w-4" />
              Powered by AI
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Get Personalized Guidance in <span className="text-orange-500">Minutes</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Describe your situation to our AI Solar Advisor. It will help us understand your needs before we recommend a tailored solution.
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

              <button onClick={handleOpenChat} className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all duration-300">
                <Bot className="h-5 w-5" />
                Talk to AI Advisor
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <span className="absolute -inset-1 rounded-xl bg-orange-500/30 animate-ping opacity-30" />
              </button>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl border border-orange-500/20 bg-slate-900/80 backdrop-blur-md p-6 shadow-[0_0_60px_rgba(249,115,22,0.15)]">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700/60 mb-4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                      <Sun className="h-5 w-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-slate-900" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Zenith AI Solar Advisor</p>
                    <p className="text-green-400 text-xs">🟢 Online · Replies instantly</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sun className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-300 max-w-xs">
                      Hi! 👋 I'm Zenith's AI Advisor. I'll ask a few questions about your property and usage before recommending a suitable solution.
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <div className="bg-orange-500/90 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-white max-w-xs">
                      I have a 3-bedroom home and my generator runs all day.
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sun className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-300 max-w-xs">
                      I can help with that. What heavy appliances (like ACs or pumps) do you typically run?
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3 border border-slate-700/60">
                  <span className="text-slate-500 text-sm flex-1">Type your message...</span>
                  <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 12. Footer
function FooterSection() {
  return (
    <footer className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 items-start">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-3">
              Zenith<span className="text-orange-500">Solar</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
              We design solar systems that reduce generator dependence and provide reliable power for Nigerian homes and businesses.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+234000000000" className="text-slate-300 hover:text-white font-medium">+234 (0) 000 000 0000</a>
              <a href="mailto:hello@zenithsolar.com.ng" className="text-slate-300 hover:text-white font-medium">hello@zenithsolar.com.ng</a>
            </div>
          </div>

          <div>
            <p className="text-white font-medium mb-4">Quick Links</p>
            <ul className="space-y-3">
              <li><a href="#projects" className="text-slate-400 hover:text-orange-500 transition-colors">Projects</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-orange-500 transition-colors">Services</a></li>
              <li><a href="#how-we-work" className="text-slate-400 hover:text-orange-500 transition-colors">How We Work</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-orange-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-medium mb-4">Quality & Trust</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              We recommend equipment based on project requirements and work with reputable global manufacturers to ensure long-term reliability.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Zenith Solar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.woflbillion.com.ng"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Zenith Solar",
    "url": siteUrl,
    "logo": `${siteUrl}/icon.svg`,
    "description": "Smart Solar Engineering for Homes and Businesses Across Nigeria.",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Nigeria" }
    ]
  }

  return (
    <main className="min-h-screen bg-slate-900 text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation onOpenModal={() => setModalOpen(true)} />
      <LeadCaptureModal open={modalOpen} onOpenChange={setModalOpen} />
      
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <CommonProblemsSection />
      <WhyZenithSection />
      <ServicesSection />
      <WhoWeHelpSection />
      <AssessmentSection onOpenModal={() => setModalOpen(true)} />
      <ProcessSection />
      <ProjectsSection />
      <FAQSection />
      <AISolarAdvisorSection />
      <FooterSection />
      
      <VoiceflowWidget />
    </main>
  )
}
