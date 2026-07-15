import prisma from "../config/db.js";

/**
 * Find an appointment by ID.
 */
export async function findAppointmentById(id, db = prisma) {
  return await db.appointment.findUnique({
    where: { id },
    include: {
      medicalRecord: true,
      service: true,
      staff: true,
    },
  });
}

/**
 * Get all appointments for an organization.
 */
export async function findAppointmentsByOrganization(
  organizationId,
  db = prisma
) {
  return await db.appointment.findMany({
    where: {
      organizationId,
    },
    include: {
      medicalRecord: true,
      service: true,
      staff: true,
    },
    orderBy: {
      appointmentDate: "desc",
    },
  });
}

/**
 * Create a new appointment.
 */
export async function createAppointment(data, db = prisma) {
  return await db.appointment.create({
    data,
    include: {
      medicalRecord: true,
      service: true,
      staff: true,
    },
  });
}

/**
 * Update an appointment.
 */
export async function updateAppointment(
  id,
  data,
  db = prisma
) {
  return await db.appointment.update({
    where: {
      id,
    },
    data,
    include: {
      medicalRecord: true,
      service: true,
      staff: true,
    },
  });
}

/**
 * Find an appointment for a staff member at a specific date and time.
 */
export async function findAppointmentByStaffAndDate(
  staffId,
  appointmentDate,
  db = prisma
) {
  return await db.appointment.findFirst({
    where: {
      staffId,
      appointmentDate,
    },
    include: {
      medicalRecord: true,
      service: true,
      staff: true,
    },
  });
}