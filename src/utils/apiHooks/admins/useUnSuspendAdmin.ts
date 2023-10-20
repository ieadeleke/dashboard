import { useState } from "react"
import { useApi } from "../index"
import { Admin } from "@/models/admins"
import { AdminService } from "@/utils/services/admins"
import { SuspendAdminParams } from "@/utils/services/admins/types"

export const useUnSuspendAdmin = () => {
    const [data, setData] = useState<Admin | null>(null)
    const { isLoading, error, execute } = useApi()

    async function unSuspendAdmin(payload: SuspendAdminParams) {
        setData(null)
        const response = await execute(async () => await AdminService().unSuspendAdmin(payload))
        if (response) {
            setData(response.user)
        }
    }

    return { isLoading, error, data, unSuspendAdmin }
}