import asyncHandler from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import {
  createStaffSchedule,
  getScheduleById,
  getStaffSchedules,
  getSchedulesByDay,
  updateStaffSchedule,
  removeSchedule,
} from "../services/schedule.service.js";

/**
 * Create schedule.
 */
export const create = asyncHandler(async (req, res) => {
  const schedule = await createStaffSchedule(req.body);

  return successResponse(
    res,
    schedule,
    "Schedule created successfully.",
    201
  );
});

/**
 * Get schedule by ID.
 */
export const getById = asyncHandler(async (req, res) => {
  const schedule = await getScheduleById(req.params.id);

  return successResponse(
    res,
    schedule,
    "Schedule retrieved successfully."
  );
});

/**
 * Get schedules for a staff member.
 */
export const getStaff = asyncHandler(async (req, res) => {
  const schedules = await getStaffSchedules(
    req.params.staffId
  );

  return successResponse(
    res,
    schedules,
    "Schedules retrieved successfully."
  );
});

/**
 * Get schedules by day.
 */
export const getDay = asyncHandler(async (req, res) => {
  const schedules = await getSchedulesByDay(
    req.params.organizationId,
    req.params.dayOfWeek
  );

  return successResponse(
    res,
    schedules,
    "Schedules retrieved successfully."
  );
});

/**
 * Update schedule.
 */
export const update = asyncHandler(async (req, res) => {
  const schedule = await updateStaffSchedule(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    schedule,
    "Schedule updated successfully."
  );
});

/**
 * Delete schedule.
 */
export const remove = asyncHandler(async (req, res) => {
  const result = await removeSchedule(req.params.id);

  return successResponse(
    res,
    result,
    "Schedule deleted successfully."
  );
});