import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { ChatMessage } from "../types/chat.type";

import { SYSTEM_PROMPT } from "../config/prompts";

export async function generateChatResponse(
    messages: ChatMessage[],
    apiKey: string
) {
    const google = createGoogleGenerativeAI({
        apiKey: apiKey
    });

    const result = await generateText({
        model: google("gemini-1.5-flash"),
        system: SYSTEM_PROMPT,
        messages,
    });

    return result.text;
}