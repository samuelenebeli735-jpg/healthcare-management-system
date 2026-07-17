import AppError from "../utils/AppError.js";

import {
  createAuditLog,
  findAuditLogById,
  findAuditLogs,
  findAuditLogsByOrganization,
  deleteAuditLog,
} from "../repositories/audit.repository.js";

/**
 * Create an audit log.
 */
export async function logAction(data) {
  return await createAuditLog(data);
}

/**
 * Get audit log by ID.
 */
export async function getAuditLogById(id) {
  const auditLog = await findAuditLogById(id);

  if (!auditLog) {
    throw new AppError(
      "Audit log not found.",
      404
    );
  }

  return auditLog;
}

/**
 * Get all audit logs.
 */
export async function getAllAuditLogs() {
  return await findAuditLogs();
}

/**
 * Get organization audit logs.
 */
export async function getOrganizationAuditLogs(
  organizationId
) {
  return await findAuditLogsByOrganization(
    organizationId
  );
}

/**
 * Delete audit log.
 */
export async function removeAuditLog(id) {
  const auditLog = await findAuditLogById(id);

  if (!auditLog) {
    throw new AppError(
      "Audit log not found.",
      404
    );
  }

  await deleteAuditLog(id);

  return {
    success: true,
    message:
      "Audit log deleted successfully.",
  };
}