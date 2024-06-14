import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Admin } from "@/models/profile"


export const useSuspendAdmin = () => {
    const [data, setData] = useState<Admin | null>(null)
    const { isLoading, error, execute } = useApi()

    async function suspendAdmin(params: { userId: string }) {
        setData(null)
        const response = await execute(async () => await AdminService().suspendAdmin(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, suspendAdmin }
}