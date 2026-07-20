import prisma from "../config/db.js";

/**
 * Create a prescription.
 */
export async function createPrescription(data, db = prisma) {
  return await db.prescription.create({
    data,
    include: {
      items: true,
      consultation: {
        include: {
          queue: {
            include: {
              appointment: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Create many prescription items.
 */
export async function createPrescriptionItems(
  items,
  db = prisma
) {
  return await db.prescriptionItem.createMany({
    data: items,
  });
}

/**
 * Find prescription by ID.
 */
export async function findPrescriptionById(
  id,
  db = prisma
) {
  return await db.prescription.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
      consultation: {
        include: {
          queue: {
            include: {
              appointment: {
                include: {
                  medicalRecord: true,
                  service: true,
                  staff: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

/**
 * Find prescription by consultation.
 */
export async function findPrescriptionByConsultation(
  consultationId,
  db = prisma
) {
  return await db.prescription.findUnique({
    where: {
      consultationId,
    },
    include: {
      items: true,
      consultation: {
        include: {
          queue: {
            include: {
              appointment: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Get all prescriptions.
 */
export async function findPrescriptions(
  db = prisma
) {
  return await db.prescription.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
      consultation: {
        include: {
          queue: {
            include: {
              appointment: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Update prescription.
 */
export async function updatePrescription(
  id,
  data,
  db = prisma
) {
  return await db.prescription.update({
    where: {
      id,
    },
    data,
  });
}

/**
 * Delete all prescription items.
 */
export async function deletePrescriptionItems(
  prescriptionId,
  db = prisma
) {
  return await db.prescriptionItem.deleteMany({
    where: {
      prescriptionId,
    },
  });
}

/**
 * Delete prescription.
 */
export async function deletePrescription(
  id,
  db = prisma
) {
  return await db.prescription.delete({
    where: {
      id,
    },
  });
}