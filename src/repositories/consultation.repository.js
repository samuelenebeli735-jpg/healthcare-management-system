import prisma from "../config/db.js";

/**
 * Find consultation by ID.
 */
export async function findConsultationById(
  id,
  db = prisma
) {
  return await db.consultation.findUnique({
    where: {
      id,
    },
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
  });
}

/**
 * Find consultation by Queue ID.
 */
export async function findConsultationByQueueId(
  queueId,
  db = prisma
) {
  return await db.consultation.findUnique({
    where: {
      queueId,
    },
    include: {
      queue: {
        include: {
          appointment: true,
        },
      },
    },
  });
}

/**
 * Get all consultations.
 */
export async function findConsultations(
  db = prisma
) {
  return await db.consultation.findMany({
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
    orderBy: {
      consultationDate: "desc",
    },
  });
}

/**
 * Create consultation.
 */
export async function createConsultation(
  data,
  db = prisma
) {
  return await db.consultation.create({
    data,
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
  });
}

/**
 * Update consultation.
 */
export async function updateConsultation(
  id,
  data,
  db = prisma
) {
  return await db.consultation.update({
    where: {
      id,
    },
    data,
    include: {
      queue: {
        include: {
          appointment: true,
        },
      },
    },
  });
}

/**
 * Delete consultation.
 */
export async function deleteConsultation(
  id,
  db = prisma
) {
  return await db.consultation.delete({
    where: {
      id,
    },
  });
}