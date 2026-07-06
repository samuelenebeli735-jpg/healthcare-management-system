import { z } from "zod";

export const createServiceSchema = z.object({
  organizationId: z.string().min(1),

  name: z.string().min(2),

  code: z.string().min(2),

  description: z.string().optional(),

  estimatedDuration: z
    .number()
    .int()
    .positive()
    .default(15),
});