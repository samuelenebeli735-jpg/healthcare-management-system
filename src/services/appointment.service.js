import AppError from "../utils/AppError.js";
import validateSchedule from "../utils/scheduleValidator.js";

import {
  findOrganizationById,
} from "../repositories/organization.repository.js";

import {
  findMedicalRecordById,
} from "../repositories/medical-record.repository.js";

import {
  findServiceById,
} from "../repositories/service.repository.js";

import {
  findStaffById,
} from "../repositories/staff.repository.js";

import {
  createAppointment,
  findAppointmentsByOrganization,
} from "../repositories/appointment.repository.js";

/**
 * Create a new appointment.
 */
export async function createNewAppointment(data) {
  // Check organization
  const organization = await findOrganizationById(
    data.organizationId
  );

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  // Check medical record
  const medicalRecord = await findMedicalRecordById(
    data.medicalRecordId
  );

  if (!medicalRecord) {
    throw new AppError("Medical record not found.", 404);
  }

  // Check service
  const service = await findServiceById(
    data.serviceId
  );

  if (!service) {
    throw new AppError(
      "Clinical service not found.",
      404
    );
  }

  if (
    service.organizationId !==
    data.organizationId
  ) {
    throw new AppError(
      "Clinical service does not belong to this organization.",
      400
    );
  }

  // Staff is optional
  let staff = null;

  if (data.staffId) {
    staff = await findStaffById(data.staffId);

    if (!staff) {
      throw new AppError(
        "Staff not found.",
        404
      );
    }

    if (
      staff.user.organizationId !==
      data.organizationId
    ) {
      throw new AppError(
        "Staff does not belong to this organization.",
        400
      );
    }

    await validateSchedule(
      staff,
      data.appointmentDate
    );
  }

  return await createAppointment({
    organizationId: data.organizationId,
    medicalRecordId: data.medicalRecordId,
    serviceId: data.serviceId,
    staffId: data.staffId || null,
    appointmentDate: new Date(
      data.appointmentDate
    ),
    reason: data.reason,
  });
}

/**
 * Get all appointments.
 */
export async function getOrganizationAppointments(
  organizationId
) {
  const organization = await findOrganizationById(
    organizationId
  );

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  return await findAppointmentsByOrganization(
    organizationId
  );
}