import { useState } from "react"
import { useApi } from "../index"
import { AuthService } from "@/utils/services/auth/index"
import { LoginParams } from "@/utils/services/auth/types"
import AuthToken from "@/utils/AuthToken"

export const useLogin = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function login(payload: LoginParams) {
        setData(null)
        const response = await execute(async () => await AuthService().login(payload))
        if (response) {
            AuthToken().saveToken(response.token)
            setData(response.message)
        }
    }

    return { isLoading, error, data, login }
}