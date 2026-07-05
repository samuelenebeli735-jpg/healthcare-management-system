import AppError from "../utils/AppError.js";

import {
  findMedicalRecordByProfileId,
  countMedicalRecordsByYear,
  createMedicalRecord,
} from "../repositories/medical-record.repository.js";

import {
  findProfileByUserId,
} from "../repositories/profile.repository.js";

/**
 * Generate a medical record number.
 * Example: MR-2026-000001
 */
function generateRecordNumber(count, year) {
  return `MR-${year}-${String(count + 1).padStart(6, "0")}`;
}

/**
 * Create a medical record for the authenticated student.
 */
export async function createStudentMedicalRecord(userId) {
  // Find the student's profile
  const profile = await findProfileByUserId(userId);

  if (!profile) {
    throw new AppError("Student profile not found.", 404);
  }

  // Ensure a medical record doesn't already exist
  const existingRecord = await findMedicalRecordByProfileId(profile.id);

  if (existingRecord) {
    throw new AppError(
      "Medical record already exists for this student.",
      409
    );
  }

  // Generate record number
  const year = new Date().getFullYear();

  const count = await countMedicalRecordsByYear(year);

  const recordNumber = generateRecordNumber(count, year);

  // Create medical record
  return await createMedicalRecord({
    profileId: profile.id,
    recordNumber,
    recordYear: year,
  });
}