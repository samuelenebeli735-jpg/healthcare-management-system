import { Router } from "express";

import validate from "../middleware/validate.middleware.js";

import {
  createDepartmentSchema,
} from "../validations/department.validation.js";

import {
  createDepartment,
  getDepartments,
} from "../controllers/departments.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Department Routes
|--------------------------------------------------------------------------
*/

// Create Department
router.post(
  "/",
  validate(createDepartmentSchema),
  createDepartment
);

// Get all departments for an organization
router.get(
  "/organization/:organizationId",
  getDepartments
);

export default router;