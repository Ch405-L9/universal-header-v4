/**
 * Express Application Setup
 *
 * Configures middleware, routes, and error handling for the backend server.
 */

import express, { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes/index";
import { env } from "./config/env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): Express {
  const app = express();

  // ============================================================================
  // MIDDLEWARE
  // ============================================================================

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use((req, res, next) => {
    const origin = req.headers.origin || "";
    const allowedOrigins = [
      env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:3000",
    ];

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  // Request logging
  app.use((req, res, next) => {
    if (env.LOG_LEVEL === "debug") {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
  });

  // ============================================================================
  // ROUTES
  // ============================================================================

  app.use("/api", routes);

  // Serve static files from client build
  const staticPath = path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));

  // SPA fallback: serve index.html for all non-API routes
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(staticPath, "index.html"));
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

  // ============================================================================
  // ERROR HANDLING
  // ============================================================================

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: `Route ${req.method} ${req.path} not found`,
      },
    });
  });

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
}



