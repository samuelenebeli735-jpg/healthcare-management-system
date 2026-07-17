import asyncHandler from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import {
  getAuditLogById,
  getAllAuditLogs,
  getOrganizationAuditLogs,
  removeAuditLog,
} from "../services/audit.service.js";

/**
 * Get all audit logs.
 */
export const getAll = asyncHandler(async (req, res) => {
  const auditLogs =
    await getAllAuditLogs();

  return successResponse(
    res,
    auditLogs,
    "Audit logs retrieved successfully."
  );
});

/**
 * Get audit log by ID.
 */
export const getById = asyncHandler(async (req, res) => {
  const auditLog =
    await getAuditLogById(req.params.id);

  return successResponse(
    res,
    auditLog,
    "Audit log retrieved successfully."
  );
});

/**
 * Get organization audit logs.
 */
export const getByOrganization =
  asyncHandler(async (req, res) => {
    const auditLogs =
      await getOrganizationAuditLogs(
        req.params.organizationId
      );

    return successResponse(
      res,
      auditLogs,
      "Organization audit logs retrieved successfully."
    );
  });

/**
 * Delete audit log.
 */
export const remove = asyncHandler(async (req, res) => {
  const result =
    await removeAuditLog(req.params.id);

  return successResponse(
    res,
    result,
    "Audit log deleted successfully."
  );
});