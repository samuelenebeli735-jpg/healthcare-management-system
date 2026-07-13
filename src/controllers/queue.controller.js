import asyncHandler from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import {
  checkInPatient,
  getTodayQueue,
  getQueueById,
  callNextPatient,
  startConsultation,
  completeConsultation,
} from "../services/queue.service.js";

/**
 * Check in patient.
 */
export const checkIn = asyncHandler(
  async (req, res) => {
    const queue = await checkInPatient(req.body);

    return successResponse(
      res,
      queue,
      "Patient checked in successfully.",
      201
    );
  }
);

/**
 * Get today's queue.
 */
export const getToday = asyncHandler(
  async (req, res) => {
    const queue = await getTodayQueue(
      req.params.organizationId
    );

    return successResponse(
      res,
      queue,
      "Queue retrieved successfully."
    );
  }
);


/**
 * Get queue entry by ID.
 */
export const getQueue = asyncHandler(
  async (req, res) => {
    const queue = await getQueueById(
      req.params.id
    );

    return successResponse(
      res,
      queue,
      "Queue retrieved successfully."
    );
  }
);

/**
 * Call next patient.
 */
export const callNext = asyncHandler(
  async (req, res) => {
    const queue = await callNextPatient(
      req.params.organizationId
    );

    return successResponse(
      res,
      queue,
      "Next patient called successfully."
    );
  }
);

/**
 * Start consultation.
 */
export const start = asyncHandler(
  async (req, res) => {
    const queue = await startConsultation(
      req.params.id
    );

    return successResponse(
      res,
      queue,
      "Consultation started successfully."
    );
  }
);

/**
 * Complete consultation.
 */
export const complete = asyncHandler(
  async (req, res) => {
    const queue = await completeConsultation(
      req.params.id
    );

    return successResponse(
      res,
      queue,
      "Consultation completed successfully."
    );
  }
);