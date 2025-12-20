import { Elysia } from "elysia";
import { db } from "./db";
import { auth } from "./lib/auth";
import { sql } from "drizzle-orm";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/health", async () => {
    try {
      // Test database connection by running a simple query
      const result = await db.execute(sql`SELECT 1 as health_check`);

      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        services: {
          api: "healthy",
          database: "connected",
        },
        database_check: result[0],
      };
    } catch (error) {
      return {
        status: "error",
        timestamp: new Date().toISOString(),
        services: {
          api: "healthy",
          database: "disconnected",
        },
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .mount(auth.handler)
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);