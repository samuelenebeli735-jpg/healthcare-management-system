import { Router } from "express";

import authRoutes from "./auth.routes.js";
import organizationRoutes from "./organizations.routes.js";
import profileRoutes from "./profiles.routes.js";
import medicalRecordRoutes from "./medical-record.routes.js";
import departmentRoutes from "./departments.routes.js";
import positionRoutes from "./positions.routes.js";
import staffRoutes from "./staff.routes.js";
import serviceRoutes from "./services.routes.js";
import appointmentRoutes from "./appointments.routes.js";

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

router.use("/organizations", organizationRoutes);

router.use("/profiles", profileRoutes);

router.use("/medical-records", medicalRecordRoutes);

router.use("/departments", departmentRoutes);

router.use("/positions", positionRoutes);

router.use("/staff", staffRoutes);

router.use("/services", serviceRoutes);

router.use("/appointments", appointmentRoutes);

export default router;