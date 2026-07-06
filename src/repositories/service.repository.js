import prisma from "../config/db.js";

/**
 * Find a service by ID.
 */
export async function findServiceById(id, db = prisma) {
  return await db.service.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Find a service by organization and code.
 */
export async function findServiceByCode(
  organizationId,
  code,
  db = prisma
) {
  return await db.service.findFirst({
    where: {
      organizationId,
      code,
    },
  });
}

/**
 * Get all services for an organization.
 */
export async function findServicesByOrganization(
  organizationId,
  db = prisma
) {
  return await db.service.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Create a new service.
 */
export async function createService(
  data,
  db = prisma
) {
  return await db.service.create({
    data,
  });
}