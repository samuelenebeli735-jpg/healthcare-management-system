import { z } from "zod";

export const createPositionSchema = z.object({
  organizationId: z.string().cuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  code: z
    .string()
    .trim()
    .min(2)
    .max(20),

  description: z
    .string()
    .trim()
    .max(255)
    .optional(),
});