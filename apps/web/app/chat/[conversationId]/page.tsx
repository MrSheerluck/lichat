"use client"

import { use } from "react"
import { ChatInput } from "@/components/chat/chat-input"
import { MessageBubble } from "@/components/chat/message-bubble"
import { useSendMessage } from "@/hooks/use-chat"
import { useConversation } from "@/hooks/use-conversation"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { useRef, useEffect } from "react"
import { useSession } from "@/lib/auth-client"

export default function ChatConversationPage({
    params
}: {
    params: Promise<{ conversationId: string }>
}) {
    const { conversationId } = use(params)
    const { data: conversation, isLoading } = useConversation(conversationId)
    const sendMessage = useSendMessage()
    const scrollRef = useRef<HTMLDivElement>(null)
    const { data: session } = useSession()

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [conversation?.messages])

    const handleSend = async (message: string) => {
        sendMessage.mutate({
            conversationId: conversationId,
            message: message
        })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="text-sm text-muted-foreground font-medium">Loading chat...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-background relative">
            <div className="shrink-0 h-14 border-b flex items-center px-4 bg-background/95 backdrop-blur z-20 gap-2">
                <SidebarTrigger />
                <span className="font-semibold text-sm truncate">
                    {conversation?.title || "Conversation"}
                </span>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto scroll-smooth"
            >
                <div className="max-w-5xl mx-auto flex flex-col pb-4 pt-4">
                    {conversation?.messages.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm mt-20">
                            Start a conversation...
                        </div>
                    ) : (
                        conversation?.messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                role={message.role}
                                content={message.content}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="shrink-0 z-20 bg-background">
                <ChatInput
                    onSend={handleSend}
                    disabled={sendMessage.isPending || !session?.user}
                    placeholder={session?.user ? "Message LiChat..." : "Sign in to chat..."}
                />
            </div>
        </div>
    )
}