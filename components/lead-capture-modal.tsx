"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { auditRoadmapClientSchema } from "@/lib/audit-roadmap-schema"

const initialFormData = {
  address: "",
  monthlyBill: [150] as number[],
  roofAge: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gdprConsent: false,
  website: "",
}

export function LeadCaptureModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  const resetForm = () => {
    setStep(1)
    setIsLoading(false)
    setFormData(initialFormData)
  }

  const resetAndClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm()
    }
    onOpenChange(isOpen)
  }

  const handleSubmit = async () => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gdprConsent: formData.gdprConsent,
      address: formData.address,
      monthlyBill: formData.monthlyBill[0],
      roofAge: formData.roofAge,
      phone: formData.phone || undefined,
      website: formData.website,
      source: "lead-capture-modal",
    }

    const parsed = auditRoadmapClientSchema.safeParse(payload)
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Please check your details"
      toast.error(firstError)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/audit-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? "Submission failed")
      }

      toast.success("Your audit roadmap is on its way!", {
        description: "Check your inbox for next steps.",
      })
      resetForm()
      onOpenChange(false)
    } catch (err) {
      const message =
        err instanceof TypeError && err.message === "Failed to fetch"
          ? "Could not reach the server. Please check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Please try again in a moment."
      toast.error("Something went wrong", { description: message })
    } finally {
      setIsLoading(false)
    }
  }

  const canSubmit =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.gdprConsent

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
              <DialogDescription>Step {step} of 3</DialogDescription>
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
                  disabled={!formData.address.trim()}
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Marcus"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Thorne"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="marcus@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {/* Honeypot — hidden from users, bots may fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, gdprConsent: checked === true })
                    }
                  />
                  <Label
                    htmlFor="gdprConsent"
                    className="text-sm leading-snug font-normal cursor-pointer"
                  >
                    I agree to Zenith Solar processing my data to deliver my audit roadmap and
                    related communications.{" "}
                    <a href="#privacy" className="text-orange-500 underline underline-offset-2">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    Get My Full Audit Roadmap
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
