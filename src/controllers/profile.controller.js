import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

/**
 * Get authenticated user's profile.
 */
export const getMyProfile = asyncHandler(async (req, res) => {
  return successResponse(
    res,
    req.user,
    "Profile retrieved successfully."
  );
});