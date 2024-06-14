import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Profile } from "@/models/profile"


export const useUnSuspendUser = () => {
    const [data, setData] = useState<Profile | null>(null)
    const { isLoading, error, execute } = useApi()

    async function unSuspendUser(params: { userId: string }) {
        setData(null)
        const response = await execute(async () => await AdminService().unSuspendUser(params))
        if (response) {
            setData(response.user)
        }
    }

    return { isLoading, error, data, unSuspendUser }
}