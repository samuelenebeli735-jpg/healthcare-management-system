import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import {
  createMyMedicalRecord,
} from "../controllers/medical-record.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Medical Records
|--------------------------------------------------------------------------
*/

router.post(
  "/me",
  authenticate,
  authorize("student"),
  createMyMedicalRecord
);

export default router;