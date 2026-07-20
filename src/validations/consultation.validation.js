import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Consultation Validation
|--------------------------------------------------------------------------
*/

export const createConsultationSchema = z.object({
  queueId: z
    .string()
    .min(1, "Queue ID is required."),

  chiefComplaint: z
    .string()
    .optional(),

  symptoms: z
    .string()
    .optional(),

  diagnosis: z
    .string()
    .optional(),

  treatmentPlan: z
    .string()
    .optional(),

  notes: z
    .string()
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Update Consultation Validation
|--------------------------------------------------------------------------
*/

export const updateConsultationSchema = z.object({
  chiefComplaint: z
    .string()
    .optional(),

  symptoms: z
    .string()
    .optional(),

  diagnosis: z
    .string()
    .optional(),

  treatmentPlan: z
    .string()
    .optional(),

  notes: z
    .string()
    .optional(),
});