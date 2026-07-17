import { body } from "express-validator";

export const createScheduleValidation = [
  body("organizationId")
    .notEmpty()
    .withMessage("Organization ID is required."),

  body("staffId")
    .notEmpty()
    .withMessage("Staff ID is required."),

  body("dayOfWeek")
    .notEmpty()
    .withMessage("Day of week is required.")
    .isIn([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ])
    .withMessage("Invalid day of week."),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required.")
    .isISO8601()
    .withMessage("Start time must be a valid date."),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required.")
    .isISO8601()
    .withMessage("End time must be a valid date."),

  body("breakStart")
    .optional()
    .isISO8601()
    .withMessage("Break start must be a valid date."),

  body("breakEnd")
    .optional()
    .isISO8601()
    .withMessage("Break end must be a valid date."),
];

export const updateScheduleValidation = [
  body("dayOfWeek")
    .optional()
    .isIn([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ])
    .withMessage("Invalid day of week."),

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("Start time must be valid."),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage("End time must be valid."),

  body("breakStart")
    .optional()
    .isISO8601()
    .withMessage("Break start must be valid."),

  body("breakEnd")
    .optional()
    .isISO8601()
    .withMessage("Break end must be valid."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean."),
];