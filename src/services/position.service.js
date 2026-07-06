import AppError from "../utils/AppError.js";

import {
  findOrganizationById,
} from "../repositories/organization.repository.js";

import {
  findPositionByCode,
  createPosition,
  findPositionsByOrganization,
} from "../repositories/position.repository.js";

/**
 * Create a new position.
 */
export async function createNewPosition(data) {
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
  const existingPosition = await findPositionByCode(
    data.organizationId,
    code
  );

  if (existingPosition) {
    throw new AppError(
      "Position code already exists.",
      409
    );
  }

  // Create position
  return await createPosition({
    organizationId: data.organizationId,
    name: data.name.trim(),
    code,
    description: data.description,
  });
}

/**
 * Get all positions for an organization.
 */
export async function getOrganizationPositions(
  organizationId
) {
  // Check organization exists
  const organization = await findOrganizationById(
    organizationId
  );

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  return await findPositionsByOrganization(
    organizationId
  );
}