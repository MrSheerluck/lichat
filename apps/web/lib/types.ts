export interface Conversation {
    id: string
    userId: string
    title: string | null
    createdAt: string
    updatedAt: string
}

export interface Message {
    id: string
    conversationId: string
    role: "user" | "assistant" | "system"
    content: string
    createdAt: string
    updatedAt: string
}

export interface UserSettings {
    id: string
    userId: string
    geminiApiKey: string | null
    createdAt: string
    updatedAt: string
}


export interface ChatRequest {
    conversationId: string
    message: string
}

export interface ChatResponse {
    message: string
}

export interface CreateConversationRequest {
    title?: string
}

export interface UpdateConversationRequest {
    title: string
}

export interface ConversationWithMessages extends Conversation {
    messages: Message[]
}


export interface SaveApiKeyRequest {
    apiKey: string
}

export interface ApiKeyStatusResponse {
    hasApiKey: boolean
}

export interface ApiKeyResponse {
    message: string
}

export interface ApiError {
    error: string
}