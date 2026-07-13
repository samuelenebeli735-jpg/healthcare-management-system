import AppError from "../utils/AppError.js";

import {
  findQueueById,
  findQueueByAppointmentId,
  findTodayQueue,
  findLastQueueToday,
  createQueue,
  updateQueue,
} from "../repositories/queue.repository.js";

import {
  findAppointmentById,
  updateAppointment,
} from "../repositories/appointment.repository.js";

import calculateQueueEstimate from "../utils/calculateQueueEstimate.js";

/**
 * Get today's date range.
 */
function getTodayRange() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return {
    startOfDay,
    endOfDay,
  };
}

/**
 * Check in a patient.
 */
export async function checkInPatient(data) {
  const appointment = await findAppointmentById(
    data.appointmentId
  );

  if (!appointment) {
    throw new AppError(
      "Appointment not found.",
      404
    );
  }

  const existingQueue =
    await findQueueByAppointmentId(
      data.appointmentId
    );

  if (existingQueue) {
    throw new AppError(
      "Patient has already checked in.",
      400
    );
  }

  const { startOfDay, endOfDay } =
    getTodayRange();
  
  const lastQueue = await findLastQueueToday(
  appointment.organizationId,
  startOfDay,
  endOfDay
);

const queueNumber = lastQueue
  ? lastQueue.queueNumber + 1
  : 1;

const estimatedWaitMinutes =
  calculateQueueEstimate(
    queueNumber - 1,
    appointment.service.estimatedDuration
  );

const queue = await createQueue({
  organizationId: appointment.organizationId,
  appointmentId: appointment.id,
  queueNumber,
  estimatedWaitMinutes,
});

await updateAppointment(
  appointment.id,
  {
    status: "checked_in",
  }
);

return queue;
}

/**
 * Get today's queue.
 */
export async function getTodayQueue(
  organizationId
) {
  const { startOfDay, endOfDay } =
    getTodayRange();

  return await findTodayQueue(
    organizationId,
    startOfDay,
    endOfDay
  );
}

/**
 * Get queue by ID.
 */
export async function getQueueById(id) {
  const queue = await findQueueById(id);

  if (!queue) {
    throw new AppError(
      "Queue entry not found.",
      404
    );
  }

  return queue;
}

/**
 * Call the next patient in the queue.
 */
export async function callNextPatient(
  organizationId
) {
  const { startOfDay, endOfDay } =
    getTodayRange();

  const queue = await findTodayQueue(
    organizationId,
    startOfDay,
    endOfDay
  );

  const nextPatient = queue.find(
    (item) => item.status === "waiting"
  );

  if (!nextPatient) {
    throw new AppError(
      "There are no patients waiting in the queue.",
      404
    );
  }

  const updatedQueue = await updateQueue(
    nextPatient.id,
    {
      status: "called",
      calledAt: new Date(),
    }
  );

  return updatedQueue;
}

/**
 * Start consultation.
 */
export async function startConsultation(
  queueId
) {
  const queue = await findQueueById(
    queueId
  );

  if (!queue) {
    throw new AppError(
      "Queue entry not found.",
      404
    );
  }

  if (queue.status !== "called") {
    throw new AppError(
      "Patient has not been called yet.",
      400
    );
  }

  return await updateQueue(
    queueId,
    {
      status: "in_progress",
      startedAt: new Date(),
    }
  );
}

/**
 * Complete consultation.
 */
export async function completeConsultation(
  queueId
) {
  const queue = await findQueueById(
    queueId
  );

  if (!queue) {
    throw new AppError(
      "Queue entry not found.",
      404
    );
  }

  if (queue.status !== "in_progress") {
    throw new AppError(
      "Consultation has not started.",
      400
    );
  }

  await updateAppointment(
    queue.appointmentId,
    {
      status: "completed",
    }
  );

  return await updateQueue(
    queueId,
    {
      status: "completed",
      completedAt: new Date(),
    }
  );
}