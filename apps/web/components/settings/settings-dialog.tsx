"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { useApiKeyStatus, useSaveApiKey, useDeleteApiKey } from "@/hooks/use-settings"
import { toast } from "sonner"
import { ApiKeyForm } from "@/components/settings/api-key-form"
import { ApiKeyStatus } from "@/components/settings/api-key-status"

interface SettingsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
    const { data: status, isLoading } = useApiKeyStatus()
    const saveApiKey = useSaveApiKey()
    const deleteApiKey = useDeleteApiKey()

    const handleSave = (apiKey: string) => {
        saveApiKey.mutate(
            { apiKey },
            {
                onSuccess: () => {
                    toast.success("API key saved successfully")
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to save API key")
                },
            }
        )
    }

    const handleDelete = () => {
        deleteApiKey.mutate(undefined, {
            onSuccess: () => {
                toast.success("API key deleted successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Failed to delete API key")
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Configure your Gemini API key to start chatting with AI.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : status?.hasApiKey ? (
                        <ApiKeyStatus
                            onDelete={handleDelete}
                            isDeleting={deleteApiKey.isPending}
                        />
                    ) : (
                        <ApiKeyForm
                            onSave={handleSave}
                            isSaving={saveApiKey.isPending}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
