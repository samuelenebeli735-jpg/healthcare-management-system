import { Router } from "express";

import validate from "../middleware/validate.middleware.js";

import { createStaffSchema } from "../validations/staff.validation.js";

import {
  createStaff,
  getStaff,
} from "../controllers/staff.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Staff
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  validate(createStaffSchema),
  createStaff
);

router.get(
  "/:organizationId",
  getStaff
);

export default router;