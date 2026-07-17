import { body } from "express-validator";

export const createConsultationValidation = [
  body("queueId")
    .notEmpty()
    .withMessage("Queue ID is required."),

  body("chiefComplaint")
    .optional()
    .isString()
    .withMessage("Chief complaint must be text."),

  body("symptoms")
    .optional()
    .isString()
    .withMessage("Symptoms must be text."),

  body("diagnosis")
    .optional()
    .isString()
    .withMessage("Diagnosis must be text."),

  body("treatmentPlan")
    .optional()
    .isString()
    .withMessage("Treatment plan must be text."),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be text.")
];

export const updateConsultationValidation = [
  body("chiefComplaint")
    .optional()
    .isString()
    .withMessage("Chief complaint must be text."),

  body("symptoms")
    .optional()
    .isString()
    .withMessage("Symptoms must be text."),

  body("diagnosis")
    .optional()
    .isString()
    .withMessage("Diagnosis must be text."),

  body("treatmentPlan")
    .optional()
    .isString()
    .withMessage("Treatment plan must be text."),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be text.")
];