const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`

    const config: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    }

    const response = await fetch(url, config)

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Something went wrong")
    }
    return response.json()
}