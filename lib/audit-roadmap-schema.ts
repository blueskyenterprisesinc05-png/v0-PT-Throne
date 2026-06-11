import { z } from "zod"

export const auditRoadmapSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(254),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy terms" }),
  }),
  address: z.string().trim().min(1, "Address is required").max(500),
  monthlyBill: z.number().min(50).max(500),
  roofAge: z.union([
    z.string().trim().min(1, "Roof age is required").max(10),
    z.number().min(0).max(100),
  ]),
  phone: z.string().trim().max(30).optional(),
  website: z.string().max(200).optional(),
  source: z.string().max(100).optional(),
})

export type AuditRoadmapPayload = z.infer<typeof auditRoadmapSchema>

export const auditRoadmapClientSchema = auditRoadmapSchema.extend({
  gdprConsent: z.boolean(),
})

export type AuditRoadmapFormData = z.infer<typeof auditRoadmapClientSchema>
