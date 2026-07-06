import AppError from "../utils/AppError.js";

import {
  findOrganizationById,
} from "../repositories/organization.repository.js";

import {
  findServiceByCode,
  createService,
  findServicesByOrganization,
} from "../repositories/service.repository.js";

/**
 * Create a new clinical service.
 */
export async function createNewService(data) {
  // Verify organization
  const organization = await findOrganizationById(
    data.organizationId
  );

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  // Normalize code
  const code = data.code.trim().toUpperCase();

  // Check duplicate code
  const existingService = await findServiceByCode(
    data.organizationId,
    code
  );

  if (existingService) {
    throw new AppError(
      "Service code already exists.",
      409
    );
  }

  // Create service
  return await createService({
    organizationId: data.organizationId,
    name: data.name.trim(),
    code,
    description: data.description,
    estimatedDuration: data.estimatedDuration,
  });
}

/**
 * Get all services for an organization.
 */
export async function getOrganizationServices(
  organizationId
) {
  const organization = await findOrganizationById(
    organizationId
  );

  if (!organization) {
    throw new AppError(
      "Organization not found.",
      404
    );
  }

  return await findServicesByOrganization(
    organizationId
  );
}