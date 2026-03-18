/**
 * Route Mounting
 *
 * Centralizes all API routes and attaches them to the Express app.
 */

import { Router } from "express";
import { getHealth } from "../controllers/health.controller";

const router = Router();

/**
 * Health Check Endpoint
 * GET /api/health
 */
router.get("/health", getHealth);

/**
 * API Status
 * GET /api/status
 */
router.get("/status", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default router;
