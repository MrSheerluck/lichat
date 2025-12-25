import { Button } from "@workspace/ui/components/button"
import { CheckCircle2 } from "lucide-react"

interface ApiKeyStatusProps {
    onDelete: () => void
    isDeleting: boolean
}

export function ApiKeyStatus({ onDelete, isDeleting }: ApiKeyStatusProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-medium">API key configured</p>
            </div>
            <p className="text-sm text-muted-foreground">
                Your Gemini API key is securely stored. You can delete it and add a new one if needed.
            </p>
            <Button
                variant="destructive"
                onClick={onDelete}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete API Key'}
            </Button>
        </div>
    )
}
