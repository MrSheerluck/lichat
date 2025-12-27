import { auth } from "../lib/auth"

export async function getCurrentUser(request: Request) {
    const session = await auth.api.getSession({
        headers: request.headers
    })

    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    return session.user;
}