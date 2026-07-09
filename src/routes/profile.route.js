import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import { getMyProfile } from "../controllers/profile.controller.js";

const router = Router();

/*
| Student Profile
|--------------------------------------------------------------------------
*/

router.get(
  "/me",
  authenticate,
  authorize("student"),
  getMyProfile
);

export default router;