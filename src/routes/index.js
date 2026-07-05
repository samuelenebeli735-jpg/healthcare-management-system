import { Router } from "express";

import authRoutes from "./auth.routes.js";
import organizationRoutes from "./organizations.routes.js";
import profileRoutes from "./profiles.routes.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| API Home
|--------------------------------------------------------------------------
*/

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SHMS API v1",
  });
});

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

router.use("/auth", authRoutes);

/*
|--------------------------------------------------------------------------
| Organization Routes
|--------------------------------------------------------------------------
*/

router.use("/organizations", organizationRoutes);

/*
|--------------------------------------------------------------------------
| Profile Routes
|--------------------------------------------------------------------------
*/

router.use("/auth", authRoutes);

router.use("/organizations", organizationRoutes);

router.use("/profiles", profileRoutes);

export default router;