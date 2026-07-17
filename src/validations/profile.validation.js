import { body } from "express-validator";

export const createProfileValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required."),

  body("firstName")
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required."),

  body("matricNumber")
    .notEmpty()
    .withMessage("Matric number is required."),

  body("faculty")
    .notEmpty()
    .withMessage("Faculty is required."),

  body("department")
    .notEmpty()
    .withMessage("Department is required."),

  body("level")
    .notEmpty()
    .withMessage("Level is required."),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required."),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required.")
    .isISO8601()
    .withMessage("Invalid date."),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required."),

  body("emergencyContactName")
    .notEmpty()
    .withMessage("Emergency contact name is required."),

  body("emergencyContactPhone")
    .notEmpty()
    .withMessage("Emergency contact phone is required."),

  body("bloodGroup")
    .optional()
    .isString(),

  body("genotype")
    .optional()
    .isString(),

  body("allergies")
    .optional()
    .isString(),
];

export const updateProfileValidation = [
  body("firstName").optional().isString(),

  body("middleName").optional().isString(),

  body("lastName").optional().isString(),

  body("faculty").optional().isString(),

  body("department").optional().isString(),

  body("level").optional().isString(),

  body("gender").optional().isString(),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Invalid date."),

  body("phone").optional().isString(),

  body("emergencyContactName")
    .optional()
    .isString(),

  body("emergencyContactPhone")
    .optional()
    .isString(),

  body("bloodGroup").optional().isString(),

  body("genotype").optional().isString(),

  body("allergies").optional().isString(),

  body("profilePhotoUrl")
    .optional()
    .isString(),
];