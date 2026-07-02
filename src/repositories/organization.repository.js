import prisma from "../config/db.js";

/**
 * Find an organization by its ID.
 */
export async function findOrganizationById(id, db = prisma) {
  return await db.organization.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Find an organization by its slug.
 */
export async function findOrganizationBySlug(slug, db = prisma) {
  return await db.organization.findUnique({
    where: {
      slug,
    },
  });
}

/**
 * Create a new organization.
 */
export async function createOrganization(data, db = prisma) {
  return await db.organization.create({
    data,
  });
}