import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createRequire } from "module";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

// ─── Helmet (security headers) ─────────────────────────────────
// helmet is a CommonJS module; use createRequire in ESM context
const _require = createRequire(import.meta.url);
const helmetFn = _require("helmet") as (opts?: object) => import("express").RequestHandler;
const applyHelmet = helmetFn({
  // Allow inline scripts for Vite HMR in dev; tighten in prod
  contentSecurityPolicy: process.env.NODE_ENV === "production",
});

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ─── Security: Helmet ─────────────────────────────────────
  app.use(applyHelmet);
  console.log("[Security] Helmet applied");

  // ─── Security: CORS restricted to client origin ───────────
  const ALLOWED_ORIGINS = new Set([
    process.env.VITE_OAUTH_PORTAL_URL,
    "http://localhost:3000",
    "http://localhost:5173",
  ].filter(Boolean) as string[]);

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const isDev = process.env.NODE_ENV === "development";
    const isAllowed = !origin || ALLOWED_ORIGINS.has(origin) || isDev;

    if (isAllowed) {
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
      }
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }
    next();
  });

  // ─── Body parsing: tight limits ───────────────────────────
  app.use("/api/trpc/contact", express.json({ limit: "64kb" }));
  app.use("/api/trpc/chat", express.json({ limit: "128kb" }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
