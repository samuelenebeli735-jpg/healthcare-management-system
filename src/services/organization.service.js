import AppError from "../utils/AppError.js";

import {
  findOrganizationBySlug,
  createOrganization,
} from "../repositories/organization.repository.js";

/**
 * Create a new organization.
 *
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function createNewOrganization(data) {
  // Check if the slug already exists
  const existingOrganization = await findOrganizationBySlug(data.slug);

  if (existingOrganization) {
    throw new AppError("Organization slug already exists.", 409);
  }

  // Create the organization
  const organization = await createOrganization({
    name: data.name,
    slug: data.slug,
    email: data.email,
    phone: data.phone,
    address: data.address,
    logoUrl: data.logoUrl,
  });

  return organization;
}