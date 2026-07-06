import { Router } from "express";

import validate from "../middleware/validate.middleware.js";

import { createPositionSchema } from "../validations/positions.validation.js";

import {
  createPosition,
  getPositions,
} from "../controllers/positions.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Positions
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  validate(createPositionSchema),
  createPosition
);

router.get(
  "/:organizationId",
  getPositions
);

export default router;