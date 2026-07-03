import { Router } from "express";

import authRoutes from "./auth.routes.js";
import organizationRoutes from "./organizations.routes.js";

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

export default router;