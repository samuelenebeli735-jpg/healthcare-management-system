import { body, param } from "express-validator";

/**
 * Create Prescription Validation
 */
export const createPrescriptionValidation = [
  body("consultationId")
    .notEmpty()
    .withMessage("Consultation ID is required.")
    .isString()
    .withMessage("Consultation ID must be a string."),

  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one prescription item is required."),

  body("items.*.medicationName")
    .notEmpty()
    .withMessage("Medication name is required."),

  body("items.*.dosage")
    .notEmpty()
    .withMessage("Dosage is required."),

  body("items.*.frequency")
    .notEmpty()
    .withMessage("Frequency is required."),

  body("items.*.duration")
    .notEmpty()
    .withMessage("Duration is required."),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
];

/**
 * Update Prescription Validation
 */
export const updatePrescriptionValidation = [
  param("id")
    .notEmpty()
    .withMessage("Prescription ID is required.")
    .isString()
    .withMessage("Prescription ID must be a string."),

  body("items")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one prescription item is required."),

  body("items.*.medicationName")
    .optional()
    .notEmpty(),

  body("items.*.dosage")
    .optional()
    .notEmpty(),

  body("items.*.frequency")
    .optional()
    .notEmpty(),

  body("items.*.duration")
    .optional()
    .notEmpty(),

  body("items.*.quantity")
    .optional()
    .isInt({ min: 1 }),
];

/**
 * Prescription ID Validation
 */
export const prescriptionIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Prescription ID is required.")
    .isString()
    .withMessage("Prescription ID must be a string."),
];