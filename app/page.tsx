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
  X,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { trackEvent } from "@/lib/analytics"
import { VoiceflowWidget } from "@/components/voiceflow-widget"

const openSolarPlanner = (source: string) => {
  trackEvent("Planner Started", { source })
  if (typeof window !== "undefined") {
    if (window.voiceflow?.chat) {
      window.voiceflow.chat.open()
    } else {
      trackEvent("Planner Fallback", { reason: "Voiceflow unavailable" })
      window.dispatchEvent(new Event("voiceflow-fallback"))
    }
  }
}

// 1. Navigation
function Navigation() {
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
    { href: "#how-we-work", label: "How We Work" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
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
            onClick={() => openSolarPlanner("Navigation")}
            className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
          >
            Start Solar Planner
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white relative z-[60]">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            {isOpen && (
              <style>{`
                #voiceflow-chat,
                .vfrc-widget {
                  display: none !important;
                  opacity: 0 !important;
                  visibility: hidden !important;
                  pointer-events: none !important;
                }
              `}</style>
            )}
            <SheetContent side="right" className="bg-slate-900 border-slate-800 w-full sm:w-[400px] pt-24 px-8 pb-12 [&>button]:hidden flex flex-col h-[100dvh]">
              <div className="flex flex-col justify-center flex-1 gap-12 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-semibold text-slate-300 hover:text-white transition-colors text-center"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto pt-8">
                <Button
                  onClick={() => {
                    setIsOpen(false)
                    openSolarPlanner("Mobile Navigation")
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-7 text-xl font-semibold shadow-lg shadow-orange-500/25 rounded-xl"
                >
                  Start Solar Planner
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
function HeroSection() {
  const openChat = () => openSolarPlanner("Hero Section")

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance max-w-4xl mx-auto">
          Every Solar System Begins With <span className="text-orange-500">Understanding Your Energy Needs.</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto text-pretty">
          We design solar systems that reduce generator dependence and provide reliable power for Nigerian homes and businesses.
        </p>
        
        <div className="mt-12 text-slate-300 font-medium mb-6">
          What would you like to do?
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
          <Button
            size="lg"
            onClick={openChat}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
          >
            Start Solar Planner
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto border-slate-500 bg-slate-800/50 text-white hover:bg-slate-700 hover:text-white text-lg px-8 py-6 shadow-none"
          >
            <a 
              href="https://wa.me/2349135889758?text=Hi%20Zenith%20Solar,%20I%20would%20like%20to%20discuss%20a%20solar%20system." 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent("WhatsApp Clicked", { source: "Hero Section" })}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </a>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto border-slate-500 bg-slate-800/50 text-white hover:bg-slate-700 hover:text-white text-lg px-8 py-6 shadow-none"
          >
            <a 
              href="tel:+2349135889758"
              onClick={() => trackEvent("Call Clicked", { source: "Hero Section" })}
            >
              Call Now
            </a>
          </Button>
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
    { icon: Home, label: "Homes", msg: "I need a solar system for my home." },
    { icon: Building2, label: "Businesses", msg: "I need a commercial solar assessment." },
    { icon: GraduationCap, label: "Schools", msg: "I'd like to discuss a school installation." },
    { icon: Hotel, label: "Hotels", msg: "I'd like an engineering consultation for a hotel system." },
    { icon: Church, label: "Churches", msg: "I'd like to discuss a solar installation for our church." },
    { icon: Factory, label: "Factories", msg: "I'd like an engineering consultation for an industrial system." },
  ]

  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <span className="text-slate-400 font-medium">WHO WE HELP (Tap to WhatsApp):</span>
          <div className="flex flex-wrap justify-center gap-8">
            {markets.map((m, i) => (
              <a 
                key={i} 
                href={`https://wa.me/2349135889758?text=${encodeURIComponent(`Hi Zenith Solar. ${m.msg}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("WhatsApp Clicked", { source: "Who We Help", type: m.label })}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border group-hover:border-green-500/30 transition-all">
                  <m.icon className="h-5 w-5 text-slate-300 group-hover:text-green-500 transition-colors" />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{m.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// 7. What Happens During Your Assessment
function AssessmentSection() {
  const deliverables = [
    "Energy usage review",
    "Recommended system size",
    "Battery capacity recommendation",
    "Estimated backup duration",
    "Equipment recommendations",
    "Estimated installation timeline",
    "Opportunity to ask questions",
  ]

  const openChat = () => openSolarPlanner("Assessment Section")

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
              <Button onClick={openChat} className="bg-orange-500 hover:bg-orange-600 text-white">
                Start Solar Planner
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

// 11. Solar Planner Section
function SolarPlannerSection() {
  const features = [
    { icon: <Home className="h-5 w-5 text-orange-400" />, text: "Collects details about your property & load" },
    { icon: <Zap className="h-5 w-5 text-orange-400" />, text: "Recommends inverter size & battery capacity" },
    { icon: <ShieldCheck className="h-5 w-5 text-orange-400" />, text: "Provides a realistic investment range" },
  ]

  const handleOpenChat = () => openSolarPlanner("Solar Planner Section")

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
              Personalized Solar Recommendation
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Find the Right <span className="text-orange-500">Solar System</span> for Your Property
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Takes about 2 minutes. We'll help you understand exactly what solar system you need before you ever speak to an engineer.
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
                Start Planning
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <span className="absolute -inset-1 rounded-xl bg-orange-500/30 animate-ping opacity-30" />
              </button>
            </div>

            <div className="relative group">
              <div 
                onClick={handleOpenChat}
                className="relative rounded-2xl border border-orange-500/20 bg-slate-900/80 backdrop-blur-md p-6 shadow-[0_0_60px_rgba(249,115,22,0.15)] cursor-pointer hover:border-orange-500/50 hover:shadow-[0_0_60px_rgba(249,115,22,0.25)] transition-all"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Solar Planning Report</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex justify-between items-center">
                      <p className="text-xs text-slate-500 font-medium">Recommended System</p>
                      <p className="text-sm text-slate-200 font-semibold">5kVA Hybrid Inverter</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex justify-between items-center">
                      <p className="text-xs text-slate-500 font-medium">Recommended Battery</p>
                      <p className="text-sm text-slate-200 font-semibold">10kWh Lithium</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex justify-between items-center">
                      <p className="text-xs text-slate-500 font-medium">Estimated Backup</p>
                      <p className="text-sm text-slate-200 font-semibold">Up to 18 Hours (Approximate)</p>
                    </div>
                  </div>
                  
                  <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-orange-200 font-medium">Estimated Investment Range</p>
                      <p className="text-lg font-bold text-white">₦4.8M – ₦5.3M</p>
                    </div>
                    <p className="text-[10px] text-orange-200/60 leading-tight">
                      This recommendation is based on the information you provided. A site visit may change the final design.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 font-bold uppercase mb-2">What happens next?</p>
                    <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside mb-3">
                      <li>Review your recommendation.</li>
                      <li>An engineer confirms your requirements.</li>
                      <li>We perform a site assessment if needed.</li>
                      <li>You receive a final system design and quotation.</li>
                    </ol>
                    <p className="text-[10px] text-orange-200/80 leading-tight pt-3 border-t border-slate-700/50">
                      Every recommendation is reviewed by a Zenith Solar engineer before a final system design is prepared.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3 border border-slate-700/60 justify-between">
                  <span className="text-slate-400 text-sm font-medium">Start your planning session</span>
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
              <a href="tel:+2349135889758" className="text-slate-300 hover:text-white font-medium">+234 913 588 9758</a>
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
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    const handleFallback = () => setShowFallback(true)
    window.addEventListener("voiceflow-fallback", handleFallback)
    return () => window.removeEventListener("voiceflow-fallback", handleFallback)
  }, [])

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
      <Navigation />
      
      <HeroSection />
      <CommonProblemsSection />
      <WhyZenithSection />
      <ServicesSection />
      <WhoWeHelpSection />
      <AssessmentSection />
      <ProcessSection />
      <ProjectsSection />
      <FAQSection />
      <SolarPlannerSection />
      <FooterSection />
      
      <VoiceflowWidget />

      <AlertDialog open={showFallback} onOpenChange={setShowFallback}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Planner temporarily unavailable</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 text-base mt-2">
              We're having trouble loading the Solar Planner right now. You can still speak directly with one of our engineers on WhatsApp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                const fallbackMsg = "Hi Zenith Solar, I'm having trouble loading the planner, but I would like to discuss a solar system for my property."
                window.open(`https://wa.me/2349135889758?text=${encodeURIComponent(fallbackMsg)}`, "_blank")
                setShowFallback(false)
              }}
            >
              Open WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
