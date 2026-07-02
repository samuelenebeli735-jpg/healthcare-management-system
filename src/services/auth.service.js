import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";

import {
  findOrganizationById,
} from "../repositories/organization.repository.js";

import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";

import {
  findProfileByMatricNumber,
  createProfile,
} from "../repositories/profile.repository.js";

import {
  hashPassword,
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
    throw new Error("Email already exists.", 409);
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

  // Generate JWT
  const token = generateToken(result.user);

  // Return the registration result
  return {
    user: result.user,
    profile: result.profile,
    token,
  };
}