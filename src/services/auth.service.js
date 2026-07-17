import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";
import { auditLogger } from "../utils/auditLogger.js";

import {
  findOrganizationById,
} from "../repositories/organization.repository.js";

import {
  findUserByEmail,
  findUserWithProfileByEmail,
  createUser,
} from "../repositories/user.repository.js";

import {
  findProfileByMatricNumber,
  createProfile,
} from "../repositories/profile.repository.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/password.js";

import generateToken from "../utils/generateToken.js";

/**
 * Register a new student.
 *
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function registerStudent(data) {
  // Check if organization exists
  const organization = await findOrganizationById(data.organizationId);

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  // Check if email already exists
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
  throw new AppError("Email already exists.", 409);
}

  // Check if matric number already exists
  const existingProfile = await findProfileByMatricNumber(
    data.matricNumber
  );

  if (existingProfile) {
    throw new AppError("Matric number already exists.", 409);
  }

  // Hash the user's password
  const hashedPassword = await hashPassword(data.password);

  // Create user and profile in a single transaction
  const result = await prisma.$transaction(async (tx) => {
    const user = await createUser(
      {
        organizationId: data.organizationId,
        email: data.email,
        password: hashedPassword,
        role: "student",
      },
      tx
    );

    const profile = await createProfile(
      {
        userId: user.id,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        matricNumber: data.matricNumber,
        faculty: data.faculty,
        department: data.department,
        level: data.level,
        gender: data.gender,
        dateOfBirth: new Date(data.dateOfBirth),
        phone: data.phone,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        bloodGroup: data.bloodGroup,
        genotype: data.genotype,
        allergies: data.allergies,
      },
      tx
    );

    return { user, profile };
  });

  const { password, ...safeUser } = result.user;

const token = generateToken(safeUser);

await auditLogger({
  organizationId: safeUser.organizationId,
  userId: safeUser.id,
  action: "REGISTER",
  entity: "User",
  entityId: safeUser.id,
  description: `Student ${result.profile.firstName} ${result.profile.lastName} registered.`,
});

return {
  user: safeUser,
  profile: result.profile,
  token,
};
}

/**
 * Login a student.
 *
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function loginStudent(data) {
  // Find the user
  const user = await findUserWithProfileByEmail(data.identifier);

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Verify password
  const passwordMatches = await comparePassword(
    data.password,
    user.password
  );

  if (!passwordMatches) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Check if account is active
  if (!user.isActive) {
    throw new AppError("Your account has been deactivated.", 403);
  }

  // Remove password before returning
const { password, ...safeUser } = user;

// Generate JWT
const token = generateToken(safeUser);

await auditLogger({
  organizationId: safeUser.organizationId,
  userId: safeUser.id,
  action: "LOGIN",
  entity: "User",
  entityId: safeUser.id,
  description: `${safeUser.email} logged in.`,
});

return {
  user: safeUser,
  token,
};
}