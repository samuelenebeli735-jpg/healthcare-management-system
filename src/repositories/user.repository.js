import prisma from "../config/db.js";

/**
 * Find a user by email.
 */
export async function findUserByEmail(email, db = prisma) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

/**
 * Find a user by email including their profile.
 */
export async function findUserWithProfileByEmail(email, db = prisma) {
  return await db.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
      organization: true,
    },
  });
}

/**
 * Find a user by ID.
 */
export async function findUserById(id, db = prisma) {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Create a new user.
 */
export async function createUser(data, db = prisma) {
  return await db.user.create({
    data,
  });
}

/**
 * Find a user by ID including profile and organization.
 */
export async function findUserWithProfileById(id, db = prisma) {
  return await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      organizationId: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,

      profile: true,
      organization: true,
    },
  });
}