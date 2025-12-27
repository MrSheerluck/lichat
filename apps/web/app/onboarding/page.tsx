"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card"
import { ApiKeyForm } from "@/components/settings/api-key-form"
import { useSaveApiKey } from "@/hooks/use-settings"
import { toast } from "sonner"
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react"

export default function OnboardingPage() {
    const [step, setStep] = useState(0)
    const router = useRouter()
    const saveApiKey = useSaveApiKey()

    const handleApiKeySave = (apiKey: string) => {
        saveApiKey.mutate({ apiKey }, {
            onSuccess: () => {
                toast.success("API Key connected successfully!")
                setStep(2)
            },
            onError: (err) => {
                toast.error(err.message || "Failed to save API key")
            }
        })
    }

    const completeOnboarding = () => {
        // Set a cookie that expires in 1 year
        document.cookie = "has_seen_onboarding=true; path=/; max-age=31536000; SameSite=Lax"
        router.push("/chat")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        {step === 0 && <Sparkles className="h-6 w-6 text-primary" />}
                        {step === 1 && <span className="font-bold text-lg text-primary">1</span>}
                        {step === 2 && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                    </div>
                    <CardTitle className="text-2xl">
                        {step === 0 && "Welcome to LiChat"}
                        {step === 1 && "Setup your Assistant"}
                        {step === 2 && "You're All Set!"}
                    </CardTitle>
                    <CardDescription>
                        {step === 0 && "Your personal, local-first AI chat assistant."}
                        {step === 1 && "Connect your Google Gemini API key to get started."}
                        {step === 2 && "Start chatting with your AI assistant now."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 0 && (
                        <div className="space-y-4">
                            <p className="text-center text-muted-foreground">
                                Experience a powerful chat interface running directly in your browser with secure key storage.
                            </p>
                        </div>
                    )}

                    {step === 1 && (
                        <ApiKeyForm
                            onSave={handleApiKeySave}
                            isSaving={saveApiKey.isPending}
                        />
                    )}

                    {step === 2 && (
                        <div className="text-center space-y-4">
                            <p className="text-muted-foreground">
                                Your API key is stored securely. You can update it anytime in Settings.
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step === 0 && (
                        <Button className="w-full" onClick={() => setStep(1)}>
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}

                    {step === 1 && (
                        <Button variant="ghost" className="w-full text-xs text-muted-foreground mt-4" onClick={() => setStep(2)}>
                            Skip for now (I have a managed plan)
                        </Button>
                    )}

                    {step === 2 && (
                        <Button className="w-full" onClick={completeOnboarding}>
                            Start Chatting
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
