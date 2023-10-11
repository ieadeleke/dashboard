import { useState } from "react"
import { useApi } from "../index"
import { AuthService } from "@/utils/services/auth/index"
import { UpdateUserParams } from "@/utils/services/auth/types"

export const useUpdateUser = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function useUpdateUser(payload: UpdateUserParams) {
        setData(null)
        const response = await execute(async () => await AuthService().updateUser(payload))
        if (response) {
            setData(response.message)
        }
    }

    return { isLoading, error, data, useUpdateUser }
}