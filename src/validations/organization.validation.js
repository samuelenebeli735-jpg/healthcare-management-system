import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Organization Validation
|--------------------------------------------------------------------------
*/

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(3, "Organization name must be at least 3 characters."),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  email: z
    .string()
    .email("Invalid email address.")
    .optional(),

  phone: z
    .string()
    .optional(),

  address: z
    .string()
    .optional(),

  logoUrl: z
    .string()
    .url("Invalid logo URL.")
    .optional(),
});