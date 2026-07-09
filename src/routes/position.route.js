import { Router } from "express";

import validate from "../middleware/validate.middleware.js";

import { createPositionSchema } from "../validations/position.validation.js";

import {
  createPosition,
  getPositions,
} from "../controllers/position.controller.js";

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