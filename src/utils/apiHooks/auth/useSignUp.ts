import { useState } from "react"
import { useApi } from "../index"
import { AuthService } from "@/utils/services/auth/index"
import { SignUpParams } from "@/utils/services/auth/types"

export const useSignUp = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function signUp(payload: SignUpParams) {
        setData(null)
        const response = await execute(async () => await AuthService().signUp(payload))
        if (response) {
            setData(response.message)
        }
    }

    return { isLoading, error, data, signUp }
}