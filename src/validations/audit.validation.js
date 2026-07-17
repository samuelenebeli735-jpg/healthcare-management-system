import { param } from "express-validator";

/**
 * Validate audit log ID.
 */
export const auditIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Audit log ID is required.")
    .isString()
    .withMessage("Audit log ID must be a string."),
];

/**
 * Validate organization ID.
 */
export const organizationAuditValidation = [
  param("organizationId")
    .notEmpty()
    .withMessage("Organization ID is required.")
    .isString()
    .withMessage("Organization ID must be a string."),
];