import asyncHandler from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import {
  createNewDepartment,
  getOrganizationDepartments,
} from "../services/department.service.js";

/**
 * Create Department
 */
export const createDepartment = asyncHandler(async (req, res) => {
  const department = await createNewDepartment(req.body);

  return successResponse(
    res,
    department,
    "Department created successfully.",
    201
  );
});

/**
 * Get Organization Departments
 */
export const getDepartments = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;

  const departments = await getOrganizationDepartments(
    organizationId
  );

  return successResponse(
    res,
    departments,
    "Departments retrieved successfully."
  );
});