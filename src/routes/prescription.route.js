import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createPrescription,
  getPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription,
} from "../controllers/prescription.controller.js";

import {
  createPrescriptionValidation,
  updatePrescriptionValidation,
  prescriptionIdValidation,
} from "../validations/prescription.validation.js";

const router = Router();

/**
 * Create prescription.
 */
router.post(
  "/",
  authenticate,
  authorize("staff", "admin", "super_admin"),
  validate(createPrescriptionValidation),
  createPrescription
);

/**
 * Get all prescriptions.
 */
router.get(
  "/",
  authenticate,
  authorize("staff", "admin", "super_admin"),
  getPrescriptions
);

/**
 * Get prescription by ID.
 */
router.get(
  "/:id",
  authenticate,
  authorize("staff", "admin", "super_admin"),
  validate(prescriptionIdValidation),
  getPrescription
);

/**
 * Update prescription.
 */
router.patch(
  "/:id",
  authenticate,
  authorize("staff", "admin", "super_admin"),
  validate(updatePrescriptionValidation),
  updatePrescription
);

/**
 * Delete prescription.
 */
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "super_admin"),
  validate(prescriptionIdValidation),
  deletePrescription
);

export default router;