import prisma from "../config/db.js";

/**
 * Find a medical record by profile ID.
 */
export async function findMedicalRecordByProfileId(profileId, db = prisma) {
  return await db.medicalRecord.findUnique({
    where: {
      profileId,
    },
    include: {
      profile: true,
    },
  });
}

/**
 * Find a medical record by ID.
 */
export async function findMedicalRecordById(id, db = prisma) {
  return await db.medicalRecord.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
}

/**
 * Find a medical record by record number.
 */
export async function findMedicalRecordByRecordNumber(
  recordNumber,
  db = prisma
) {
  return await db.medicalRecord.findUnique({
    where: {
      recordNumber,
    },
  });
}

/**
 * Count medical records created in a specific year.
 */
export async function countMedicalRecordsByYear(recordYear, db = prisma) {
  return await db.medicalRecord.count({
    where: {
      recordYear,
    },
  });
}

/**
 * Create a medical record.
 */
export async function createMedicalRecord(data, db = prisma) {
  return await db.medicalRecord.create({
    data,
    include: {
      profile: {
        include: {
          user: {
            include: {
              organization: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Update a medical record.
 */
export async function updateMedicalRecord(id, data, db = prisma) {
  return await db.medicalRecord.update({
    where: {
      id,
    },
    data,
  });
}