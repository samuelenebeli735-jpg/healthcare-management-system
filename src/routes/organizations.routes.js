import { Router } from "express";

import { createOrganization } from "../controllers/organizations.controller.js";
import validate from "../middleware/validate.middleware.js";
import { createOrganizationSchema } from "../validations/organization.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Organization Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  validate(createOrganizationSchema),
  createOrganization
);

export default router;