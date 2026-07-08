import asyncHandler from "../utils/asyncHandler.js";

import { successResponse } from "../utils/apiResponse.js";

import {
  createNewAppointment,
  getOrganizationAppointments,
} from "../services/appointment.service.js";

/**
 * Create a new appointment.
 */
export const createAppointment = asyncHandler(
  async (req, res) => {
    const appointment = await createNewAppointment(req.body);

    return successResponse(
      res,
      "Appointment created successfully.",
      appointment,
      201
    );
  }
);

/**
 * Get all appointments for an organization.
 */
export const getAppointments = asyncHandler(
  async (req, res) => {
    const appointments =
      await getOrganizationAppointments(
        req.params.organizationId
      );

    return successResponse(
      res,
      "Appointments retrieved successfully.",
      appointments
    );
  }
);