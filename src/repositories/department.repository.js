import prisma from "../config/db.js";

/**
 * Find a department by ID.
 */
export async function findDepartmentById(id, db = prisma) {
  return await db.department.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Find a department by organization and code.
 */
export async function findDepartmentByCode(
  organizationId,
  code,
  db = prisma
) {
  return await db.department.findFirst({
    where: {
      organizationId,
      code,
    },
  });
}

/**
 * Find all departments for an organization.
 */
export async function findDepartmentsByOrganization(
  organizationId,
  db = prisma
) {
  return await db.department.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Create a department.
 */
export async function createDepartment(data, db = prisma) {
  return await db.department.create({
    data,
  });
}