import { apiClient } from './client'
import type { ChatRequest, ChatResponse } from '../types'

export const chatApi = {
    sendMessage: (data: ChatRequest) =>
        apiClient<ChatResponse>('/api/chat', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
}