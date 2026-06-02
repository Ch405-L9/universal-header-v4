import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

function loadLocalEnv() {
  for (const fileName of [".env.local", ".env"]) {
    const filePath = resolve(process.cwd(), fileName);
    if (!existsSync(filePath)) continue;

    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      const value = rawValue.replace(/^['"]|['"]$/g, "");

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  }
}

loadLocalEnv();

const { default: checkoutHandler } = await import("./api/stripe/create-checkout-session");
const { default: lighthouseScanRequestHandler } = await import("./api/lighthouse-scan-request");
const { default: webhookHandler } = await import("./api/stripe/webhook");

type DevRequest = IncomingMessage & {
  body?: unknown;
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
};

type DevResponse = ServerResponse & {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
  send: (body: string | Buffer) => VercelResponse;
};

function addVercelResponseHelpers(res: ServerResponse): VercelResponse {
  const devRes = res as DevResponse;

  devRes.status = (statusCode: number) => {
    res.statusCode = statusCode;
    return devRes as unknown as VercelResponse;
  };

  devRes.json = (body: unknown) => {
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify(body));
    return devRes as unknown as VercelResponse;
  };

  devRes.send = (body: string | Buffer) => {
    res.end(body);
    return devRes as unknown as VercelResponse;
  };

  return devRes as unknown as VercelResponse;
}

async function readBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

async function attachJsonBody(req: DevRequest, res: ServerResponse) {
  const rawBody = await readBody(req);

  if (rawBody.length === 0) {
    req.body = {};
    return true;
  }

  try {
    req.body = JSON.parse(rawBody.toString("utf8")) as unknown;
    return true;
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Invalid JSON body" }));
    return false;
  }
}

function attachUrlData(req: DevRequest) {
  const host = req.headers.host ?? "localhost:3002";
  const url = new URL(req.url ?? "/", `http://${host}`);
  const query: Record<string, string | string[]> = {};

  url.searchParams.forEach((value, key) => {
    const existing = query[key];
    if (Array.isArray(existing)) {
      existing.push(value);
    } else if (existing) {
      query[key] = [existing, value];
    } else {
      query[key] = value;
    }
  });

  req.query = query;
}

const server = createServer(async (req: DevRequest, res) => {
  const response = addVercelResponseHelpers(res);
  const pathname = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost:3002"}`).pathname;

  attachUrlData(req);
  console.log(`${req.method} ${pathname}`);

  try {
    if (req.method === "POST" && pathname === "/api/stripe/webhook") {
      return await webhookHandler(req as unknown as VercelRequest, response);
    }

    if (req.method === "POST" && pathname === "/api/stripe/create-checkout-session") {
      if (!(await attachJsonBody(req, res))) return;
      return await checkoutHandler(req as unknown as VercelRequest, response);
    }

    if (req.method === "POST" && pathname === "/api/lighthouse-scan-request") {
      if (!(await attachJsonBody(req, res))) return;
      return await lighthouseScanRequestHandler(req as unknown as VercelRequest, response);
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Not found" }));
  } catch (error) {
    console.error("[dev-api] request failed:", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify({ error: "Internal dev API error" }));
  }
});

server.listen(3002, () => {
  console.log("Dev API server -> http://localhost:3002");
});
