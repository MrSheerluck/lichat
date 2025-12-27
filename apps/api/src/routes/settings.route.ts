import { Elysia, t } from "elysia";
import { getCurrentUser } from "../utils/auth.util";
import { deleteApiKey, getApiKey, upsertApiKey } from "../services/settings.service";



const apiKeyModel = t.Object({
    apiKey: t.String({ minLength: 1 })
})

export const settingsRoute = new Elysia()
    .put("/api/settings/api-key", async ({ body, request }) => {
        const user = await getCurrentUser(request)

        const { apiKey } = body

        await upsertApiKey(
            user.id,
            apiKey
        )
        return { message: "API key saved successfully" };
    }, {
        body: apiKeyModel,
        response: t.Object({
            message: t.String()
        })
    })
    .get("/api/settings/api-key", async ({ request }) => {
        const user = await getCurrentUser(request)
        const apiKey = await getApiKey(user.id)
        return { hasApiKey: !!apiKey }
    }, {
        response: t.Object({
            hasApiKey: t.Boolean()
        })
    })
    .delete("/api/settings/api-key", async ({ request }) => {
        const user = await getCurrentUser(request)
        await deleteApiKey(user.id)
        return { message: "API key deleted successfully" }
    }, {
        response: t.Object({
            message: t.String()
        })
    })
