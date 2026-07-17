import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  getAll,
  getById,
  getByOrganization,
  remove,
} from "../controllers/audit.controller.js";

import {
  auditIdValidation,
  organizationAuditValidation,
} from "../validations/audit.validation.js";

const router = Router();

/**
 * Get all audit logs.
 */
router.get(
  "/",
  authenticate,
  authorize("admin", "super_admin"),
  getAll
);

/**
 * Get organization audit logs.
 */
router.get(
  "/organization/:organizationId",
  authenticate,
  authorize("admin", "super_admin"),
  validate(organizationAuditValidation),
  getByOrganization
);

/**
 * Get audit log by ID.
 */
router.get(
  "/:id",
  authenticate,
  authorize("admin", "super_admin"),
  validate(auditIdValidation),
  getById
);

/**
 * Delete audit log.
 */
router.delete(
  "/:id",
  authenticate,
  authorize("super_admin"),
  validate(auditIdValidation),
  remove
);

export default router;