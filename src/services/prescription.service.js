import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";
import { auditLogger } from "../utils/auditLogger.js";

import {
  createPrescription,
  createPrescriptionItems,
  findPrescriptionById,
  findPrescriptionByConsultation,
  findPrescriptions,
  updatePrescription,
  deletePrescription,
  deletePrescriptionItems,
} from "../repositories/prescription.repository.js";

import {
  findConsultationById,
} from "../repositories/consultation.repository.js";

/**
 * Create prescription.
 */
export async function create(data, user) {
  // Ensure consultation exists
  const consultation = await findConsultationById(
    data.consultationId
  );

  if (!consultation) {
    throw new AppError(
      "Consultation not found.",
      404
    );
  }

  // Ensure consultation doesn't already have a prescription
  const existingPrescription =
    await findPrescriptionByConsultation(
      data.consultationId
    );

  if (existingPrescription) {
    throw new AppError(
      "Prescription already exists for this consultation.",
      409
    );
  }

  // Ensure at least one medication is provided
  if (
    !data.items ||
    !Array.isArray(data.items) ||
    data.items.length === 0
  ) {
    throw new AppError(
      "At least one prescription item is required.",
      400
    );
  }

  const prescription = await prisma.$transaction(
    async (tx) => {
      const createdPrescription =
        await createPrescription(
          {
            consultationId: data.consultationId,
          },
          tx
        );

      await createPrescriptionItems(
        data.items.map((item) => ({
          prescriptionId: createdPrescription.id,
          medicationName: item.medicationName,
          dosage: item.dosage,
          frequency: item.frequency,
          duration: item.duration,
          quantity: item.quantity,
          instructions: item.instructions,
        })),
        tx
      );

      return await findPrescriptionById(
        createdPrescription.id,
        tx
      );
    }
  );

  await auditLogger({
    organizationId:
      consultation.queue.organizationId,
    userId: user.id,
    action: "CREATE",
    entity: "Prescription",
    entityId: prescription.id,
    description: `Created prescription for consultation ${consultation.id}.`,
  });

  return prescription;
}

/**
 * Get all prescriptions.
 */
export async function getAll() {
  return await findPrescriptions();
}

/**
 * Get prescription by ID.
 */
export async function getById(id) {
  const prescription =
    await findPrescriptionById(id);

  if (!prescription) {
    throw new AppError(
      "Prescription not found.",
      404
    );
  }

  return prescription;
}

/**
 * Update prescription.
 */
export async function update(id, data, user) {
  const prescription =
    await findPrescriptionById(id);

  if (!prescription) {
    throw new AppError(
      "Prescription not found.",
      404
    );
  }

  // Ensure at least one medication is provided
  if (
    !data.items ||
    !Array.isArray(data.items) ||
    data.items.length === 0
  ) {
    throw new AppError(
      "At least one prescription item is required.",
      400
    );
  }

  const updatedPrescription =
    await prisma.$transaction(async (tx) => {
      // Update timestamp
      await updatePrescription(
        id,
        {},
        tx
      );

      // Remove old medications
      await deletePrescriptionItems(
        id,
        tx
      );

      // Add new medications
      await createPrescriptionItems(
        data.items.map((item) => ({
          prescriptionId: id,
          medicationName: item.medicationName,
          dosage: item.dosage,
          frequency: item.frequency,
          duration: item.duration,
          quantity: item.quantity,
          instructions: item.instructions,
        })),
        tx
      );

      return await findPrescriptionById(
        id,
        tx
      );
    });

  await auditLogger({
    organizationId:
      updatedPrescription.consultation.queue.organizationId,
    userId: user.id,
    action: "UPDATE",
    entity: "Prescription",
    entityId: id,
    description: `Updated prescription ${id}.`,
  });

  return updatedPrescription;
}

/**
 * Delete prescription.
 */
export async function remove(id, user) {
  const prescription =
    await findPrescriptionById(id);

  if (!prescription) {
    throw new AppError(
      "Prescription not found.",
      404
    );
  }

  await deletePrescription(id);

  await auditLogger({
    organizationId:
      prescription.consultation.queue.organizationId,
    userId: user.id,
    action: "DELETE",
    entity: "Prescription",
    entityId: id,
    description: `Deleted prescription ${id}.`,
  });

  return {
    success: true,
    message:
      "Prescription deleted successfully.",
  };
}