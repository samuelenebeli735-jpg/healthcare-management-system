import prisma from "../config/db.js";

/**
 * Find a staff member by ID.
 */
export async function findStaffById(id, db = prisma) {
  return await db.staff.findUnique({
    where: { id },
    include: {
      user: true,
      department: true,
      position: true,
    },
  });
}

/**
 * Find a staff member by staff number.
 */
export async function findStaffByStaffNumber(
  staffNumber,
  db = prisma
) {
  return await db.staff.findUnique({
    where: {
      staffNumber,
    },
  });
}

/**
 * Find a staff member by user ID.
 */
export async function findStaffByUserId(
  userId,
  db = prisma
) {
  return await db.staff.findUnique({
    where: {
      userId,
    },
  });
}

/**
 * Get all staff within an organization.
 */
export async function findStaffByOrganization(
  organizationId,
  db = prisma
) {
  return await db.staff.findMany({
    where: {
      user: {
        organizationId,
      },
    },
    include: {
      department: true,
      position: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
        },
      },
    },
    orderBy: {
      firstName: "asc",
    },
  });
}

/**
 * Create a staff profile.
 */
export async function createStaff(
  data,
  db = prisma
) {
  return await db.staff.create({
    data,
  });
}