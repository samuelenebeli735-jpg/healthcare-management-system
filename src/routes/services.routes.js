import { Router } from "express";

import validate from "../middleware/validate.middleware.js";

import { createServiceSchema } from "../validations/service.validation.js";

import {
  createService,
  getServices,
} from "../controllers/services.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Clinical Services
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  validate(createServiceSchema),
  createService
);

router.get(
  "/:organizationId",
  getServices
);

export default router;