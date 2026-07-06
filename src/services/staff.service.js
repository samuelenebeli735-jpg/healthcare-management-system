import prisma from "../config/db.js";

import AppError from "../utils/AppError.js";

import { hashPassword } from "../utils/password.js";

import {
  findOrganizationById,
} from "../repositories/organization.repository.js";

import {
  findDepartmentById,
} from "../repositories/department.repository.js";

import {
  findPositionById,
} from "../repositories/position.repository.js";

import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";

import {
  createStaff,
  findStaffByOrganization,
} from "../repositories/staff.repository.js";

/**
 * Generate a staff number.
 * Example:
 * RUN-STF-000001
 */
function generateStaffNumber(count) {
  return `RUN-STF-${String(count + 1).padStart(6, "0")}`;
}

/**
 * Create a new staff member.
 */
export async function createNewStaff(data) {
  // Verify organization
  const organization = await findOrganizationById(
    data.organizationId
  );

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  // Verify department
  const department = await findDepartmentById(
    data.departmentId
  );

  if (!department) {
    throw new AppError("Department not found.", 404);
  }

  // Verify position
  const position = await findPositionById(
    data.positionId
  );

  if (!position) {
    throw new AppError("Position not found.", 404);
  }

  // Check email
  const existingUser = await findUserByEmail(
    data.email
  );

  if (existingUser) {
    throw new AppError(
      "Email already exists.",
      409
    );
  }

  // Hash password
  const hashedPassword = await hashPassword(
    data.password
  );

  // Current staff count
  const currentStaffCount = await prisma.staff.count();

  const staffNumber = generateStaffNumber(
    currentStaffCount
  );

  // Transaction
  return await prisma.$transaction(async (tx) => {
    // Create user
    const user = await createUser(
      {
        organizationId: data.organizationId,
        email: data.email,
        password: hashedPassword,
        role: "staff",
      },
      tx
    );

    // Create staff profile
    const staff = await createStaff(
      {
        userId: user.id,

        departmentId: data.departmentId,
        positionId: data.positionId,

        staffNumber,

        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,

        gender: data.gender,
        dateOfBirth: data.dateOfBirth,

        phone: data.phone,

        employmentDate: data.employmentDate,

        qualification: data.qualification,
        licenseNumber: data.licenseNumber,

        profilePhotoUrl: data.profilePhotoUrl,
      },
      tx
    );

    return staff;
  });
}

/**
 * Get all staff for an organization.
 */
export async function getOrganizationStaff(
  organizationId
) {
  // Verify organization exists
  const organization = await findOrganizationById(
    organizationId
  );

  if (!organization) {
    throw new AppError(
      "Organization not found.",
      404
    );
  }

  return await findStaffByOrganization(
    organizationId
  );
}