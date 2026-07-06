import prisma from "../config/db.js";

/**
 * Find a position by ID.
 */
export async function findPositionById(id, db = prisma) {
  return await db.position.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Find a position by code within an organization.
 */
export async function findPositionByCode(
  organizationId,
  code,
  db = prisma
) {
  return await db.position.findFirst({
    where: {
      organizationId,
      code,
    },
  });
}

/**
 * Get all positions for an organization.
 */
export async function findPositionsByOrganization(
  organizationId,
  db = prisma
) {
  return await db.position.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Create a new position.
 */
export async function createPosition(data, db = prisma) {
  return await db.position.create({
    data,
  });
}