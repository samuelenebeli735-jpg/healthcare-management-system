import { registerStudent } from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerStudent(req.body);

  return successResponse(
    res,
    result,
    "Student registered successfully.",
    201
  );
});