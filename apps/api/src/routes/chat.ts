import { Elysia, t } from "elysia";
import { generateChatResponse } from "../services/ai.service";

export const chatRoute = new Elysia()
    .post("/api/chat", async ({ body }) => {
        const message = body.message;
        const response = await generateChatResponse(message);
        return { response }
    }, {
        body: t.Object({
            message: t.String(),
        }),
        response: t.Object({
            response: t.String(),
        }),
    })