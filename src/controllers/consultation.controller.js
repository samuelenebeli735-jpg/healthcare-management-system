import asyncHandler from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import {
  createPatientConsultation,
  getConsultationById,
  getAllConsultations,
  updatePatientConsultation,
  removeConsultation,
} from "../services/consultation.service.js";

/**
 * Create consultation.
 */
export const create = asyncHandler(async (req, res) => {
  const consultation =
    await createPatientConsultation(req.body);

  return successResponse(
    res,
    consultation,
    "Consultation created successfully.",
    201
  );
});

/**
 * Get all consultations.
 */
export const getAll = asyncHandler(async (req, res) => {
  const consultations =
    await getAllConsultations();

  return successResponse(
    res,
    consultations,
    "Consultations retrieved successfully."
  );
});

/**
 * Get consultation by ID.
 */
export const getById = asyncHandler(async (req, res) => {
  const consultation =
    await getConsultationById(req.params.id);

  return successResponse(
    res,
    consultation,
    "Consultation retrieved successfully."
  );
});

/**
 * Update consultation.
 */
export const update = asyncHandler(async (req, res) => {
  const consultation =
    await updatePatientConsultation(
      req.params.id,
      req.body
    );

  return successResponse(
    res,
    consultation,
    "Consultation updated successfully."
  );
});

/**
 * Delete consultation.
 */
export const remove = asyncHandler(async (req, res) => {
  const result =
    await removeConsultation(req.params.id);

  return successResponse(
    res,
    result,
    "Consultation deleted successfully."
  );
});