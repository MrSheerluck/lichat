import { conversationsApi } from "@/lib/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateConversationRequest, UpdateConversationRequest } from "@/lib/types"

export function useConversations() {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: conversationsApi.getAll,
    })
}

export function useConversation(id: string) {
    return useQuery({
        queryKey: ['conversations', id],
        queryFn: () => conversationsApi.getById(id),
        enabled: !!id,
    })
}

export function useCreateConversation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: conversationsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] })
        },
    })
}

export function useUpdateConversation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateConversationRequest }) =>
            conversationsApi.update(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] })
            queryClient.invalidateQueries({ queryKey: ['conversations', variables.id] })
        },
    })
}

export function useDeleteConversation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => conversationsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] })
        },
    })
}