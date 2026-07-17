import prisma from "../config/db.js";

/**
 * Create an audit log.
 */
export async function createAuditLog(
  data,
  db = prisma
) {
  return await db.auditLog.create({
    data,
    include: {
      organization: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });
}

/**
 * Find an audit log by ID.
 */
export async function findAuditLogById(
  id,
  db = prisma
) {
  return await db.auditLog.findUnique({
    where: {
      id,
    },
    include: {
      organization: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });
}

/**
 * Get all audit logs.
 */
export async function findAuditLogs(
  db = prisma
) {
  return await db.auditLog.findMany({
    include: {
      organization: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get audit logs for an organization.
 */
export async function findAuditLogsByOrganization(
  organizationId,
  db = prisma
) {
  return await db.auditLog.findMany({
    where: {
      organizationId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Delete an audit log.
 */
export async function deleteAuditLog(
  id,
  db = prisma
) {
  return await db.auditLog.delete({
    where: {
      id,
    },
  });
}