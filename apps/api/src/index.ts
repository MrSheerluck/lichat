import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { db } from "./db";
import { auth } from "./lib/auth";
import { sql } from "drizzle-orm";
import { chatRoute } from "./routes/chat.route";

const app = new Elysia()
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  .get("/", () => "LiChat API")

  .get("/health", async () => {
    try {
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

  .all("/api/auth/*", async ({ request }) => {
    try {
      const response = await auth.handler(request);
      return response;
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Auth Error" }), { status: 500 });
    }
  })

  .use(chatRoute)

  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

console.log("AUTH BASE URL:", process.env.BETTER_AUTH_URL);
