import { apiClient } from "./client"
import type {
    ApiKeyStatusResponse,
    SaveApiKeyRequest,
    ApiKeyResponse
} from "../types"



export const settingsApi = {
    getApiKeyStatus: () => apiClient<ApiKeyStatusResponse>("/api/settings/api-key"),
    saveApiKey: (data: SaveApiKeyRequest) => apiClient<ApiKeyResponse>("/api/settings/api-key", {
        method: "PUT",
        body: JSON.stringify(data)
    }),
    deleteApiKey: () => apiClient<ApiKeyResponse>("/api/settings/api-key", {
        method: "DELETE"
    })
}