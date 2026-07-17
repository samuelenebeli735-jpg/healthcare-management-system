import { body } from "express-validator";

export const checkInValidation = [
  body("appointmentId")
    .notEmpty()
    .withMessage("Appointment ID is required."),
];