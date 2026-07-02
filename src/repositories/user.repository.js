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