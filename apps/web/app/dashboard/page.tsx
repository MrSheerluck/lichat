"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@workspace/ui/components/button"

export default function DashboardPage() {
    const { data: session, isPending } = useSession()

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <p>You are not signed in</p>
                    <Button onClick={() => window.location.href = "/sign-in"}>
                        Go to Sign In
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md space-y-6 p-8">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {session.user.name}!
                    </p>
                </div>

                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Email:</p>
                    <p>{session.user.email}</p>
                </div>

                <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="w-full"
                >
                    Sign Out
                </Button>
            </div>
        </div>
    )
}