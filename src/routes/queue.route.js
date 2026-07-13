import { Router } from "express";

import {
  checkIn,
  getToday,
  getQueue,
  callNext,
  start,
  complete,
} from "../controllers/queue.controller.js";

const router = Router();

/**
 * Check in a patient.
 */
router.post("/check-in", checkIn);

/**
 * Today's queue.
 */
router.get("/today/:organizationId", getToday);

/**
 * Queue details.
 */
router.get("/:id", getQueue);

/**
 * Call next patient.
 */
router.post("/call-next/:organizationId", callNext);

/**
 * Start consultation.
 */
router.patch("/:id/start", start);

/**
 * Complete consultation.
 */
router.patch("/:id/complete", complete);

export default router;