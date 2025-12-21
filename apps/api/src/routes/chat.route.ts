import { Elysia, t } from "elysia";
import { generateChatResponse } from "../services/ai.service";
import { chatRequestModel } from "../models/chat.model";

export const chatRoute = new Elysia().post(
    "/api/chat",
    async ({ body }) => {
        const stream = await generateChatResponse(body.messages);

        return stream.textStream;
    },
    {
        body: chatRequestModel,
    }
);