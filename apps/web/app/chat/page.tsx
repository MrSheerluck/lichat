"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { useCreateConversation } from "@/hooks/use-conversation"
import { useSendMessage } from "@/hooks/use-chat"
import { useRouter } from "next/navigation"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"

export default function ChatPage() {
    const router = useRouter()
    const createConversation = useCreateConversation()
    const sendMessage = useSendMessage()

    const handleSend = async (message: string) => {
        const newConversation = await createConversation.mutateAsync({
            title: message.slice(0, 30) || "New Chat"
        })

        await sendMessage.mutateAsync({
            conversationId: newConversation.id,
            message: message
        })

        router.push(`/chat/${newConversation.id}`)
    }

    return (
        <div className="flex flex-col h-screen bg-background">

            <header className="sticky top-0 z-10 flex items-center p-3 text-sm font-medium text-muted-foreground/70 sm:hidden">

                <span>LiChat</span>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 pb-20 sm:pb-24">
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-2xl w-full text-center">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                            How can I help you today?
                        </h1>
                    </div>
                </div>

                <div className="w-full max-w-5xl">
                    <ChatInput
                        onSend={handleSend}
                        disabled={createConversation.isPending || sendMessage.isPending}
                        placeholder="Message LiChat..."
                    />
                </div>
            </main>
        </div>
    )
}