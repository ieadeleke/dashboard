import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Admin } from "@/models/profile"


export const useGetAdmins = () => {
    const [data, setData] = useState<Admin[]>([])
    const [count, setCount] = useState(0)
    const { isLoading, error, execute } = useApi()

    async function getAdmins(params?: { page?: number }) {
        setData([])
        const response = await execute(async () => await AdminService().getAdmins(params))
        if (response) {
            setData(response.Admins)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, count, getAdmins }
}