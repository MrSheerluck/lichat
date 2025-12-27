"use client"

import { useState } from "react"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { toast } from "sonner"

interface ApiKeyFormProps {
    onSave: (apiKey: string) => void
    isSaving: boolean
}

export function ApiKeyForm({ onSave, isSaving }: ApiKeyFormProps) {
    const [apiKey, setApiKey] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!apiKey.trim()) {
            toast.error("Please enter an API key")
            return
        }

        onSave(apiKey)
        setApiKey('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="apiKey">Gemini API Key</Label>
                <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    disabled={isSaving}
                />
                <p className="text-sm text-muted-foreground">
                    Don't have an API key?{' '}
                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground"
                    >
                        Get one from Google AI Studio
                    </a>
                </p>
            </div>
            <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save API Key'}
            </Button>
        </form>
    )
}