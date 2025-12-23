import { db } from "../db";
import { conversation, message } from "../db/schema";
import { eq, and, asc } from "drizzle-orm";


export async function createConversation(userId: string, title: string = "New Chat") {
    const [newConversation] = await db.insert(conversation).values({
        id: crypto.randomUUID(),
        userId,
        title,
    })
        .returning();

    return newConversation;
}

export async function getConversationWithMessages(conversationId: string, userId: string) {
    const getConversation = await db.query.conversation.findFirst({
        where: and(eq(conversation.id, conversationId), eq(conversation.userId, userId)),
        with: {
            messages: {
                orderBy: asc(message.createdAt),
            },
        }
    })

    return getConversation;
}

export async function addMessage(conversationId: string, role: string, content: string) {
    const [newMessage] = await db.insert(message).values({
        id: crypto.randomUUID(),
        conversationId,
        role,
        content,
    })
        .returning();

    return newMessage;
}