import { useContext, useRef, useState } from "react"
import { errorHandler } from "@/utils/errorHandler"
import Router from "next/router";
import AuthToken from "../AuthToken";
import { GlobalActionContext } from "@/context/GlobalActionContext";

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
    const { showSnackBar } = useContext(GlobalActionContext)

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
                const token = AuthToken().retrieveToken()
                if (parsedError.status == 401 && token) {
                    showSnackBar({severity: 'error', message: "Not Authorized"})
                    // Router.push("/login")
                    // AuthToken().clearToken()
                    
                }else{
                     Router.push("/login")
                    AuthToken().clearToken()
                }
                setError(parsedError.message)
            } finally {
                setIsLoading(false)
                isFetching.current = false
            }
        }
    }

    return { isLoading, error, execute }
}