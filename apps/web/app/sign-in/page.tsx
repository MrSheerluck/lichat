"use client"

import { signIn } from "@/lib/auth-client"
import { Button } from "@workspace/ui/components/button"



export default function SignInPage() {

    const handleGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000/chat",
        })
    }

    const handleGithubSignIn = async () => {
        await signIn.social({
            provider: "github",
            callbackURL: "http://localhost:3000/chat",
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md space-y-6 p-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Welcome to LiChat</h1>
                    <p className="text-muted-foreground">
                        Sign in to start chatting
                    </p>
                </div>
                <div className="space-y-3">
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full"
                    >
                        Continue with Google
                    </Button>
                    <Button
                        onClick={handleGithubSignIn}
                        variant="outline"
                        className="w-full"
                    >
                        Continue with GitHub
                    </Button>
                </div>
            </div>
        </div>
    )

}