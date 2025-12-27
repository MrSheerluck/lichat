"use client"

import { MessageSquare, Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useConversations, useDeleteConversation } from "@/hooks/use-conversation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuAction,
} from "@workspace/ui/components/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { NavUser } from "@/components/nav-user"

export function AppSidebar() {
    const params = useParams()
    const router = useRouter()
    const conversationId = params?.conversationId as string
    const { data: conversations, isLoading } = useConversations()
    const deleteConversation = useDeleteConversation()

    const handleDelete = async (id: string) => {
        await deleteConversation.mutateAsync(id)
        if (conversationId === id) {
            router.push('/chat')
        }
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="px-2 py-2">
                    <Button
                        onClick={() => router.push('/chat')}
                        className="w-full justify-start gap-2"
                        variant="outline"
                    >
                        <Plus className="h-4 w-4" />
                        New Chat
                    </Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Recent</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isLoading ? (
                                <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
                            ) : conversations?.map((conversation) => (
                                <SidebarMenuItem key={conversation.id}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={conversationId === conversation.id}
                                    >
                                        <Link href={`/chat/${conversation.id}`}>
                                            <MessageSquare className="h-4 w-4" />
                                            <span className="truncate">{conversation.title || "New Conversation"}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction>
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="right" align="start">
                                            <DropdownMenuItem
                                                className="text-destructive focus:text-destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDelete(conversation.id)
                                                }}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
