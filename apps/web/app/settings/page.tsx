"use client"

import { useApiKeyStatus, useSaveApiKey, useDeleteApiKey } from "@/hooks/use-settings"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@workspace/ui/components/card"
import { toast } from "sonner"
import { ApiKeyForm } from "@/components/settings/api-key-form"
import { ApiKeyStatus } from "@/components/settings/api-key-status"

export default function SettingsPage() {
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
        <div className="container max-w-2xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                        Configure your Gemini API key to start chatting with AI
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    )
}