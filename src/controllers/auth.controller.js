import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  registerStudent,
  loginStudent,
} from "../services/auth.service.js";

/*
|--------------------------------------------------------------------------
| Register Student
|--------------------------------------------------------------------------
*/

export const register = asyncHandler(async (req, res) => {
  const result = await registerStudent(req.body);

  return successResponse(
    res,
    result,
    "Student registered successfully.",
    201
  );
});

/*
|--------------------------------------------------------------------------
| Login Student
|--------------------------------------------------------------------------
*/

export const login = asyncHandler(async (req, res) => {
  const result = await loginStudent(req.body);

  return successResponse(
    res,
    result,
    "Login successful.",
    200
  );
});