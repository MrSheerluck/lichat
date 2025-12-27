import { Elysia } from "elysia";
import { generateChatResponse } from "../services/ai.service";
import { chatRequestModel } from "../models/chat.model";
import { getCurrentUser } from "../utils/auth.util";
import { getConversationWithMessages, addMessage } from "../services/conversation.service";
import { getApiKey } from "../services/settings.service";

export const chatRoute = new Elysia().post(
    "/api/chat",
    async ({ body, request }) => {
        try {
            const user = await getCurrentUser(request);
            const userApiKey = await getApiKey(user.id);

            if (!userApiKey) {
                throw new Error("Please configure your Gemini API key in settings");
            }

            const conversation = await getConversationWithMessages(
                body.conversationId,
                user.id
            );

            if (!conversation) {
                throw new Error("Conversation not found");
            }

            // Save user message
            const newMessage = await addMessage(body.conversationId, "user", body.message);

            // Build messages array
            const messages = [...conversation.messages, newMessage].map(
                (message) => ({
                    role: message.role as "user" | "assistant" | "system",
                    content: message.content,
                })
            );

            // Get AI response (no streaming)
            const aiResponse = await generateChatResponse(messages, userApiKey);

            // Save assistant message
            await addMessage(body.conversationId, "assistant", aiResponse);

            // Return the response
            return {
                message: aiResponse
            };
        } catch (error: any) {
            const errorMessage = getAIErrorMessage(error);
            return new Response(
                JSON.stringify({ error: errorMessage }),
                {
                    status: error.statusCode || 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
    },
    {
        body: chatRequestModel,
    }
);

function getAIErrorMessage(error: any): string {
    if (error?.["vercel.ai.error"]) {
        const message = error.message || error.responseBody;

        if (message?.includes("quota") || message?.includes("RESOURCE_EXHAUSTED")) {
            return "You've exceeded your Gemini API quota. Please check your API usage at https://ai.dev/usage or wait for your quota to reset.";
        }

        if (message?.includes("API key") || message?.includes("UNAUTHENTICATED")) {
            return "Invalid Gemini API key. Please check your API key in settings.";
        }

        if (message?.includes("rate limit") || error.statusCode === 429) {
            return "Rate limit exceeded. Please wait a moment before trying again.";
        }
    }

    return error.message || "An error occurred while generating the response. Please try again.";
}