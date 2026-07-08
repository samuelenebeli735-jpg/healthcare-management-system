import { z } from "zod";

export const createAppointmentSchema = z.object({
  organizationId: z.string().min(1, "Organization ID is required."),

  medicalRecordId: z.string().min(1, "Medical record ID is required."),

  serviceId: z.string().min(1, "Service ID is required."),

  staffId: z.string().optional(),

  appointmentDate: z
    .string()
    .datetime("Invalid appointment date."),

  reason: z
    .string()
    .max(500, "Reason cannot exceed 500 characters.")
    .optional(),
});