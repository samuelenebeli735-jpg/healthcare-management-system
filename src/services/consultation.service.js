import AppError from "../utils/AppError.js";

import {
  findConsultationById,
  findConsultationByQueueId,
  findConsultations,
  createConsultation,
  updateConsultation,
  deleteConsultation,
} from "../repositories/consultation.repository.js";

import { findQueueById } from "../repositories/queue.repository.js";

/**
 * Create consultation.
 */
export async function createPatientConsultation(data) {
  const queue = await findQueueById(data.queueId);

  if (!queue) {
    throw new AppError(
      "Queue entry not found.",
      404
    );
  }

  if (queue.status !== "in_progress") {
    throw new AppError(
      "Patient consultation has not started.",
      400
    );
  }

  const existingConsultation =
    await findConsultationByQueueId(
      data.queueId
    );

  if (existingConsultation) {
    throw new AppError(
      "Consultation already exists.",
      400
    );
  }

  return await createConsultation(data);
}

/**
 * Get consultation by ID.
 */
export async function getConsultationById(id) {
  const consultation =
    await findConsultationById(id);

  if (!consultation) {
    throw new AppError(
      "Consultation not found.",
      404
    );
  }

  return consultation;
}

/**
 * Get all consultations.
 */
export async function getAllConsultations() {
  return await findConsultations();
}

/**
 * Update consultation.
 */
export async function updatePatientConsultation(
  id,
  data
) {
  const consultation =
    await findConsultationById(id);

  if (!consultation) {
    throw new AppError(
      "Consultation not found.",
      404
    );
  }

  return await updateConsultation(
    id,
    data
  );
}

/**
 * Delete consultation.
 */
export async function removeConsultation(id) {
  const consultation =
    await findConsultationById(id);

  if (!consultation) {
    throw new AppError(
      "Consultation not found.",
      404
    );
  }

  await deleteConsultation(id);

  return {
    success: true,
    message:
      "Consultation deleted successfully.",
  };
}