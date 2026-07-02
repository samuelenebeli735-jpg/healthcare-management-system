import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Student Registration Validation
|--------------------------------------------------------------------------
*/

export const registerSchema = z.object({
  organizationId: z
    .string()
    .min(1, "Organization is required."),

  email: z
  .string()
    .email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),

  firstName: z
    .string()
    .min(2, "First name is required."),

  middleName: z
    .string()
    .optional(),

  lastName: z
    .string()
    .min(2, "Last name is required."),

  matricNumber: z
    .string()
    .min(3, "Matric number is required."),

  faculty: z
    .string()
    .min(2, "Faculty is required."),

  department: z
    .string()
    .min(2, "Department is required."),

  level: z.enum(
  ["100", "200", "300", "400", "500", "600", "700"],
  {
    error: "Invalid academic level.",
  }),

  gender: z.enum(["Male", "Female"], {
    error: "Gender must be either Male or Female.",
  }),

  dateOfBirth: z.iso.date({
    error: "Date of birth must be in YYYY-MM-DD format.",
  }),

  phone: z
    .string()
    .min(10, "Phone number is invalid."),

  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name is required."),

  emergencyContactPhone: z
    .string()
    .min(10, "Emergency contact phone is invalid."),

  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  genotype: z
    .enum(["AA", "AS", "AC", "SS", "SC"])
    .optional(),

  allergies: z
    .string()
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Login Validation
|--------------------------------------------------------------------------
*/

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or matric number is required."),

  password: z
    .string()
    .min(1, "Password is required."),
});