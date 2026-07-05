import AppError from "../utils/AppError.js";

import {
  findOrganizationById,
} from "../repositories/organization.repository.js";

import {
  findDepartmentByCode,
  createDepartment,
  findDepartmentsByOrganization,
} from "../repositories/department.repository.js";

/**
 * Create a new department.
 */
export async function createNewDepartment(data) {
  // Check if organization exists
  const organization = await findOrganizationById(
    data.organizationId
  );

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  // Normalize code
  const code = data.code.trim().toUpperCase();

  // Check if code already exists
  const existingDepartment = await findDepartmentByCode(
    data.organizationId,
    code
  );

  if (existingDepartment) {
    throw new AppError(
      "Department code already exists.",
      409
    );
  }

  // Create department
  return await createDepartment({
    organizationId: data.organizationId,
    name: data.name.trim(),
    code,
    description: data.description,
    location: data.location,
    phone: data.phone,
    email: data.email,
  });
}

/**
 * Get all departments for an organization.
 */
export async function getOrganizationDepartments(
  organizationId
) {
  const organization = await findOrganizationById(
    organizationId
  );

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  return await findDepartmentsByOrganization(
    organizationId
  );
}