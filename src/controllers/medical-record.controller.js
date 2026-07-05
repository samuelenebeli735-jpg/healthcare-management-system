import asyncHandler from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import {
  createStudentMedicalRecord,
} from "../services/medical-record.service.js";

/**
 * Create the authenticated student's medical record.
 */
export const createMyMedicalRecord = asyncHandler(
  async (req, res) => {
    const medicalRecord =
      await createStudentMedicalRecord(req.user.id);

    return successResponse(
      res,
      medicalRecord,
      "Medical record created successfully.",
      201
    );
  }
);