import { z } from "zod";

export const createDepartmentSchema = z.object({
  organizationId: z
    .string()
    .min(1, "Organization ID is required."),

  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters.")
    .max(100, "Department name is too long."),

  code: z
    .string()
    .trim()
    .min(2, "Department code must be at least 2 characters.")
    .max(10, "Department code cannot exceed 10 characters."),

  description: z
    .string()
    .max(500, "Description is too long.")
    .optional(),

  location: z
    .string()
    .max(100, "Location is too long.")
    .optional(),

  phone: z
    .string()
    .max(20, "Phone number is too long.")
    .optional(),

  email: z
    .string()
    .email("Invalid email address.")
    .optional(),
});