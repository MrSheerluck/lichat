// chat.service.ts
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import type { ChatMessage } from "../types/chat.type";

export async function generateChatResponse(
    messages: ChatMessage[]
) {
    return streamText({
        model: google("gemini-2.5-flash"),
        messages,
    });
}