import AppError from "../utils/AppError.js";

import {
  findScheduleById,
  findScheduleByStaffAndDay,
  findSchedulesByStaff,
  findSchedulesByDay,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../repositories/schedule.repository.js";

import { findOrganizationById } from "../repositories/organization.repository.js";
import { findStaffById } from "../repositories/staff.repository.js";

/**
 * Create schedule.
 */
export async function createStaffSchedule(data) {
  const organization = await findOrganizationById(
    data.organizationId
  );

  if (!organization) {
    throw new AppError(
      "Organization not found.",
      404
    );
  }

  const staff = await findStaffById(data.staffId);

  if (!staff) {
    throw new AppError(
      "Staff not found.",
      404
    );
  }

  const existingSchedule =
    await findScheduleByStaffAndDay(
      data.staffId,
      data.dayOfWeek
    );

  if (existingSchedule) {
    throw new AppError(
      "Schedule already exists for this day.",
      400
    );
  }

  if (new Date(data.startTime) >= new Date(data.endTime)) {
    throw new AppError(
      "Start time must be before end time.",
      400
    );
  }

  if (data.breakStart && data.breakEnd) {
    if (
      new Date(data.breakStart) >=
      new Date(data.breakEnd)
    ) {
      throw new AppError(
        "Break start must be before break end.",
        400
      );
    }
  }

  return await createSchedule(data);
}

/**
 * Get schedule by ID.
 */
export async function getScheduleById(id) {
  const schedule = await findScheduleById(id);

  if (!schedule) {
    throw new AppError(
      "Schedule not found.",
      404
    );
  }

  return schedule;
}

/**
 * Get schedules for a staff member.
 */
export async function getStaffSchedules(
  staffId
) {
  return await findSchedulesByStaff(staffId);
}

/**
 * Get schedules by day.
 */
export async function getSchedulesByDay(
  organizationId,
  dayOfWeek
) {
  return await findSchedulesByDay(
    organizationId,
    dayOfWeek
  );
}

/**
 * Update schedule.
 */
export async function updateStaffSchedule(
  id,
  data
) {
  const schedule = await findScheduleById(id);

  if (!schedule) {
    throw new AppError(
      "Schedule not found.",
      404
    );
  }

  if (
    data.startTime &&
    data.endTime &&
    new Date(data.startTime) >=
      new Date(data.endTime)
  ) {
    throw new AppError(
      "Start time must be before end time.",
      400
    );
  }

  if (data.breakStart && data.breakEnd) {
    if (
      new Date(data.breakStart) >=
      new Date(data.breakEnd)
    ) {
      throw new AppError(
        "Break start must be before break end.",
        400
      );
    }
  }

  return await updateSchedule(id, data);
}

/**
 * Delete schedule.
 */
export async function removeSchedule(id) {
  const schedule = await findScheduleById(id);

  if (!schedule) {
    throw new AppError(
      "Schedule not found.",
      404
    );
  }

  await deleteSchedule(id);

  return {
    success: true,
    message: "Schedule deleted successfully.",
  };
}