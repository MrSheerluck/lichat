import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const hasSeenOnboarding = request.cookies.get('has_seen_onboarding')

    // If user hasn't seen onboarding and is not already on the onboarding page
    if (!hasSeenOnboarding && request.nextUrl.pathname !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
