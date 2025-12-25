import { settingsApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useApiKeyStatus() {
    return useQuery({
        queryKey: ['settings', 'api-key'],
        queryFn: settingsApi.getApiKeyStatus,
    })
}

export function useSaveApiKey() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: settingsApi.saveApiKey,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['settings', 'api-key']
            })
        }
    })
}

export function useDeleteApiKey() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: settingsApi.deleteApiKey,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['settings', 'api-key']
            })
        }
    })
}