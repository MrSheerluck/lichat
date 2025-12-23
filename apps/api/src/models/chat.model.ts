import { t } from "elysia"

export const chatMessageModel = t.Object({
    role: t.Union([
        t.Literal("system"),
        t.Literal("user"),
        t.Literal("assistant")
    ]),
    content: t.String({ minLength: 1 })
})

export const chatRequestModel = t.Object({
    conversationId: t.String(),
    message: t.String({ minLength: 1 })
})