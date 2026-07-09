import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  createNewPosition,
  getOrganizationPositions,
} from "../services/position.service.js";

/**
 * Create a new position.
 */
export const createPosition = asyncHandler(async (req, res) => {
  const position = await createNewPosition(req.body);

  return successResponse(
    res,
    position,
    "Position created successfully.",
    201
  );
});

/**
 * Get all positions for an organization.
 */
export const getPositions = asyncHandler(async (req, res) => {
  const positions = await getOrganizationPositions(
    req.params.organizationId
  );

  return successResponse(
    res,
    positions,
    "Positions retrieved successfully."
  );
});