import prisma from "../config/db.js";

/**
 * Find queue entry by ID.
 */
export async function findQueueById(id, db = prisma) {
  return await db.queue.findUnique({
    where: {
      id,
    },
    include: {
      appointment: {
        include: {
          medicalRecord: true,
          service: true,
          staff: true,
        },
      },
    },
  });
}

/**
 * Find queue entry by appointment.
 */
export async function findQueueByAppointmentId(
  appointmentId,
  db = prisma
) {
  return await db.queue.findUnique({
    where: {
      appointmentId,
    },
  });
}

/**
 * Get today's queue.
 */
export async function findTodayQueue(
  organizationId,
  startOfDay,
  endOfDay,
  db = prisma
) {
  return await db.queue.findMany({
    where: {
      organizationId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      appointment: {
        include: {
          medicalRecord: true,
          service: true,
          staff: true,
        },
      },
    },
    orderBy: {
      queueNumber: "asc",
    },
  });
}

/**
 * Get the last queue number issued today.
 */
export async function findLastQueueToday(
  organizationId,
  startOfDay,
  endOfDay,
  db = prisma
) {
  return await db.queue.findFirst({
    where: {
      organizationId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      queueNumber: "desc",
    },
  });
}

/**
 * Create queue entry.
 */
export async function createQueue(
  data,
  db = prisma
) {
  return await db.queue.create({
    data,
    include: {
      appointment: {
        include: {
          medicalRecord: true,
          service: true,
          staff: true,
        },
      },
    },
  });
}

/**
 * Update queue.
 */
export async function updateQueue(
  id,
  data,
  db = prisma
) {
  return await db.queue.update({
    where: {
      id,
    },
    data,
    include: {
      appointment: true,
    },
  });
}