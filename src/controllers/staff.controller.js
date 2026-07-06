import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  createNewStaff,
  getOrganizationStaff,
} from "../services/staff.service.js";

/**
 * Create a new staff member.
 */
export const createStaff = asyncHandler(async (req, res) => {
  const staff = await createNewStaff(req.body);

  return successResponse(
    res,
    staff,
    "Staff created successfully.",
    201
  );
});

/**
 * Get all staff for an organization.
 */
export const getStaff = asyncHandler(async (req, res) => {
  const staff = await getOrganizationStaff(
    req.params.organizationId
  );

  return successResponse(
    res,
    staff,
    "Staff retrieved successfully."
  );
});