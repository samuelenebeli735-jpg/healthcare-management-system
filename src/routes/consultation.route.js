import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/consultation.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  createConsultationValidation,
  updateConsultationValidation,
} from "../validations/consultation.validation.js";

const router = Router();

/**
 * Create consultation.
 */
router.post(
  "/",
  validate(createConsultationValidation),
  create
);

/**
 * Get all consultations.
 */
router.get("/", getAll);

/**
 * Get consultation by ID.
 */
router.get("/:id", getById);

/**
 * Update consultation.
 */
router.patch(
  "/:id",
  validate(updateConsultationValidation),
  update
);

/**
 * Delete consultation.
 */
router.delete("/:id", remove);

export default router;