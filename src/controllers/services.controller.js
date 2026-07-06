import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  createNewService,
  getOrganizationServices,
} from "../services/service.service.js";

/**
 * Create a clinical service.
 */
export const createService = asyncHandler(async (req, res) => {
  const service = await createNewService(req.body);

  return successResponse(
    res,
    service,
    "Service created successfully.",
    201
  );
});

/**
 * Get organization services.
 */
export const getServices = asyncHandler(async (req, res) => {
  const services = await getOrganizationServices(
    req.params.organizationId
  );

  return successResponse(
    res,
    services,
    "Services retrieved successfully."
  );
});