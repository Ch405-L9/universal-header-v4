/**
 * Health Check Controller
 *
 * Handles health check requests and returns application status.
 */

import { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service";

/**
 * GET /api/health
 * Returns application health status
 */
export async function getHealth(req: Request, res: Response): Promise<void> {
  try {
    const health = await getHealthStatus();
    res.status(200).json(health);
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
