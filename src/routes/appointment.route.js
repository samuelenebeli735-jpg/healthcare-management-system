import { Router } from "express";

import {
  createAppointment,
  getAppointments,
} from "../controllers/appointment.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  createAppointmentSchema,
} from "../validations/appointment.validation.js";

const router = Router();

router.post(
  "/",
  validate(createAppointmentSchema),
  createAppointment
);

router.get(
  "/:organizationId",
  getAppointments
);

export default router;