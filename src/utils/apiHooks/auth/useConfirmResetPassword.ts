import { useState } from "react"
import { useApi } from "../index"
import { AuthService } from "@/utils/services/auth/index"
import { ConfirmResetPasswordParams } from "@/utils/services/auth/types"

export const useConfirmResetPassword = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function confirmResetPassword(payload: ConfirmResetPasswordParams) {
        setData(null)
        const response = await execute(async () => await AuthService().confirmResetPassword(payload))
        if (response) {
            setData(response.message)
        }
    }

    return { isLoading, error, data, confirmResetPassword }
}