import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from "sonner"
import { chatApi } from '@/lib/api'
import type { ChatRequest } from '@/lib/types'


export function useSendMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: chatApi.sendMessage,
        onMutate: async (newMessage) => {

            await queryClient.cancelQueries({
                queryKey: ['conversations', newMessage.conversationId]
            })

            const previousConversation = queryClient.getQueryData(['conversations', newMessage.conversationId])


            queryClient.setQueryData(['conversations', newMessage.conversationId], (old: any) => {
                if (!old) return old

                return {
                    ...old,
                    messages: [
                        ...old.messages,
                        {
                            id: 'temp-' + Date.now(),
                            role: 'user',
                            content: newMessage.message,
                            createdAt: new Date().toISOString()
                        }
                    ]
                }
            })


            return { previousConversation }
        },
        onError: (err, newMessage, context) => {
            toast.error(err.message || "Failed to send message")

            queryClient.setQueryData(
                ['conversations', newMessage.conversationId],
                context?.previousConversation
            )
        },
        onSettled: (data, error, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['conversations', variables.conversationId]
            })
        },
    })
}