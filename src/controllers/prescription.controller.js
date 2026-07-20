import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../services/prescription.service.js";

/**
 * Create prescription.
 */
export const createPrescription = asyncHandler(
  async (req, res) => {
    const prescription = await create(
      req.body,
      req.user
    );

    return successResponse(
      res,
      prescription,
      "Prescription created successfully.",
      201
    );
  }
);

/**
 * Get all prescriptions.
 */
export const getPrescriptions = asyncHandler(
  async (req, res) => {
    const prescriptions = await getAll();

    return successResponse(
      res,
      prescriptions,
      "Prescriptions retrieved successfully."
    );
  }
);

/**
 * Get prescription by ID.
 */
export const getPrescription = asyncHandler(
  async (req, res) => {
    const prescription = await getById(
      req.params.id
    );

    return successResponse(
      res,
      prescription,
      "Prescription retrieved successfully."
    );
  }
);

/**
 * Update prescription.
 */
export const updatePrescription = asyncHandler(
  async (req, res) => {
    const prescription = await update(
      req.params.id,
      req.body,
      req.user
    );

    return successResponse(
      res,
      prescription,
      "Prescription updated successfully."
    );
  }
);

/**
 * Delete prescription.
 */
export const deletePrescription = asyncHandler(
  async (req, res) => {
    const result = await remove(
      req.params.id,
      req.user
    );

    return successResponse(
      res,
      result,
      "Prescription deleted successfully."
    );
  }
);