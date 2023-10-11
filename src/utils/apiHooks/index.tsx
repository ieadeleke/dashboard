import { useRef, useState } from "react"
import { errorHandler } from "@/utils/errorHandler"

type ExecuteConfig = {
    onError?: (error: string) => void
}

export type RefreshConfig = {
    shouldRefresh?: boolean
}

export const useApi = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const isFetching = useRef(false)

    async function execute<T>(callback: () => Promise<T>, config?: ExecuteConfig) {
        if (!isFetching.current) {
            try {
                isFetching.current = true

                setIsLoading(true)
                setError(null)
                return await callback()
            } catch (error: any) {
                if (config?.onError) {
                    config.onError(error)
                    return
                }
                const parsedError = errorHandler(error)
                setError(parsedError.message)
            } finally {
                setIsLoading(false)
                isFetching.current = false
            }
        }
    }

    return { isLoading, error, execute }
}