import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { ChatMessage } from "../types/chat.type";

export async function generateChatResponse(
    messages: ChatMessage[],
    apiKey: string
) {
    const google = createGoogleGenerativeAI({
        apiKey: apiKey
    });

    const result = await generateText({
        model: google("gemini-2.5-flash"),
        messages,
    });

    return result.text;
}