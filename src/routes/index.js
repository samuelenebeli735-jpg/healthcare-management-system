import { Router } from "express";

import authRoutes from "./auth.route.js";
import organizationRoutes from "./organization.route.js";
import profileRoutes from "./profile.route.js";
import medicalRecordRoutes from "./medical-record.route.js";
import departmentRoutes from "./department.route.js";
import positionRoutes from "./position.route.js";
import staffRoutes from "./staff.route.js";
import serviceRoutes from "./service.route.js";
import appointmentRoutes from "./appointment.route.js";

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