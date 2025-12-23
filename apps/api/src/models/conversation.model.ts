import { t } from "elysia"


export const createConversationModel = t.Object({
    title: t.Optional(t.String({ minLength: 1 }))
})

export const updateConversationModel = t.Object({
    title: t.String({ minLength: 1 })
})