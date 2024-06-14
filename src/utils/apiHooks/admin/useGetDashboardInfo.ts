import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { DashboardInfo } from "@/models/dashboard"


export const useGetDashboardInfo = () => {
    const [data, setData] = useState<DashboardInfo | null>(null)
    const { isLoading, error, execute } = useApi()

    async function getDashboardInfo() {
        setData(null)
        const response = await execute(async () => await AdminService().getDashboardInfo())
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, getDashboardInfo }
}