import { Elysia, t } from "elysia"

import { getCurrentUser } from "../utils/auth.util"

import { createConversation } from "../services/conversation.service"

import { createConversationModel } from "../models/conversation.model"


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

