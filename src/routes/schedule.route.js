import { Router } from "express";

import {
  create,
  getById,
  getStaff,
  getDay,
  update,
  remove,
} from "../controllers/schedule.controller.js";

const router = Router();

/**
 * Create schedule.
 */
router.post("/", create);

/**
 * Get all schedules for a staff member.
 */
router.get("/staff/:staffId", getStaff);

/**
 * Get schedules for a day.
 */
router.get(
  "/day/:organizationId/:dayOfWeek",
  getDay
);

/**
 * Get schedule by ID.
 */
router.get("/:id", getById);

/**
 * Update schedule.
 */
router.patch("/:id", update);

/**
 * Delete schedule.
 */
router.delete("/:id", remove);

export default router;