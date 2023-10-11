import { useState } from "react"
import { useApi } from "../index"
import { AuthService } from "@/utils/services/auth/index"
import { ActivateUserParams } from "@/utils/services/auth/types"

export const useActivateUser = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function activateUser(payload: ActivateUserParams) {
        setData(null)
        const response = await execute(async () => await AuthService().activateUser(payload))
        if (response) {
            setData(response.message)
        }
    }

    return { isLoading, error, data, activateUser }
}