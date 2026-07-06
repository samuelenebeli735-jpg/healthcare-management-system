import { z } from "zod";

export const createStaffSchema = z.object({
  organizationId: z.string().min(1),

  departmentId: z.string().min(1),

  positionId: z.string().min(1),

  email: z.email(),

  password: z.string().min(8),

  firstName: z.string().min(2),

  middleName: z.string().optional(),

  lastName: z.string().min(2),

  gender: z.string().min(1),

  dateOfBirth: z.coerce.date(),

  phone: z.string().min(5),

  employmentDate: z.coerce.date(),

  qualification: z.string().optional(),

  licenseNumber: z.string().optional(),

  profilePhotoUrl: z.string().optional(),
});