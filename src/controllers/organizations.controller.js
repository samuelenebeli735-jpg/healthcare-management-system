import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import { createNewOrganization } from "../services/organization.service.js";

/*
|--------------------------------------------------------------------------
| Create Organization
|--------------------------------------------------------------------------
*/

export const createOrganization = asyncHandler(async (req, res) => {
  const organization = await createNewOrganization(req.body);

  return successResponse(
    res,
    organization,
    "Organization created successfully.",
    201
  );
});