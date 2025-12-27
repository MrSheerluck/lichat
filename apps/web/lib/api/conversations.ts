import { apiClient } from './client'
import type {
    Conversation,
    ConversationWithMessages,
    CreateConversationRequest,
    UpdateConversationRequest,
} from '../types'


export const conversationsApi = {
    getAll: () => apiClient<Conversation[]>('/api/conversations'),
    getById: (id: string) => apiClient<ConversationWithMessages>(`/api/conversations/${id}`),
    create: (data: CreateConversationRequest) => apiClient<Conversation>("/api/conversations", {
        method: "POST",
        body: JSON.stringify(data)
    }),
    update: (id: string, data: UpdateConversationRequest) => apiClient<Conversation>(`/api/conversations/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    }),
    delete: (id: string) => apiClient<Conversation>(`/api/conversations/${id}`, {
        method: "DELETE"
    })
}