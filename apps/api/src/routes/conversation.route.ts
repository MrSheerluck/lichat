import { Elysia, t } from "elysia"

import { getCurrentUser } from "../utils/auth.util"

import { createConversation, deleteConversation, getConversationWithMessages, listConversations, updateConversationTitle } from "../services/conversation.service"

import { createConversationModel, updateConversationModel } from "../models/conversation.model"


export const conversationRoute = new Elysia()
    .post("/api/conversations",
        async ({
            body, request
        }) => {
            const user = await getCurrentUser(request)

            const newConversation = await createConversation(user.id, body.title || "New Chat")

            return newConversation
        },
        {
            body: createConversationModel
        }
    )
    .get("/api/conversations", async ({ request }) => {
        const user = await getCurrentUser(request)
        const conversations = await listConversations(user.id)
        return conversations
    })
    .delete("/api/conversations/:id", async ({ params, request }) => {
        const user = await getCurrentUser(request)
        const deletedConversation = await deleteConversation(params.id, user.id)
        return deletedConversation
    })
    .get("/api/conversations/:id", async ({ params, request }) => {
        const user = await getCurrentUser(request)
        const conversation = await getConversationWithMessages(params.id, user.id)
        return conversation
    })
    .patch("/api/conversations/:id", async ({ params, body, request }) => {
        const user = await getCurrentUser(request)
        const updatedConversation = await updateConversationTitle(params.id, user.id, body.title)
        return updatedConversation
    },
        {
            body: updateConversationModel
        })

