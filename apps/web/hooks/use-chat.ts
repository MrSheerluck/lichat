import { useMutation, useQueryClient } from '@tanstack/react-query'
import { chatApi } from '@/lib/api'
import type { ChatRequest } from '@/lib/types'


export function useSendMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: chatApi.sendMessage,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['conversations', variables.conversationId]
            })
        },
    })
}