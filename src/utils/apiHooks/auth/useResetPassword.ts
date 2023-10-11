import { useState } from "react"
import { useApi } from "../index"
import { AuthService } from "@/utils/services/auth/index"
import { ResetPasswordParams } from "@/utils/services/auth/types"

export const useResetPassword = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function resetPassword(payload: ResetPasswordParams) {
        setData(null)
        const response = await execute(async () => await AuthService().resetPassword(payload))
        if (response) {
            setData(response.message)
        }
    }

    return { isLoading, error, data, resetPassword }
}