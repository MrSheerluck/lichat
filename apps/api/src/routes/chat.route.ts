import { Elysia, t } from "elysia";
import { generateChatResponse } from "../services/ai.service";
import { chatRequestModel } from "../models/chat.model";
import { getCurrentUser } from "../utils/auth.util";
import { getConversationWithMessages, addMessage } from "../services/conversation.service";

export const chatRoute = new Elysia().post(
    "/api/chat",
    async ({ body, request }) => {
        const user = await getCurrentUser(request);

        const conversation = await getConversationWithMessages(body.conversationId, user.id);

        if (!conversation) {
            throw new Error("Conversation not found");
        }

        const newMessage = await addMessage(conversation.id, "user", body.message);

        const messages = [...conversation.messages, newMessage].map(
            (message) => ({
                role: message.role as "user" | "assistant" | "system",
                content: message.content,
            })
        );

        const stream = await generateChatResponse(messages);

        let fullText = "";
        const textStream = stream.textStream;

        const responseStream = new ReadableStream({
            async start(controller) {
                const reader = textStream.getReader();
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        fullText += value;
                        controller.enqueue(value);
                    }

                    await addMessage(conversation.id, "assistant", fullText);
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        return responseStream;
    },
    {
        body: chatRequestModel,
    }
);