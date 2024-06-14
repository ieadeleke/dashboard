import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Role } from "@/models/profile"


export const useGetRoles = () => {
    const [data, setData] = useState<Role[]>([])
    const { isLoading, error, execute } = useApi()

    async function getRoles() {
        setData([])
        const response = await execute(async () => await AdminService().getRoles())
        if (response) {
            setData(response.AdminRole)
        }
    }

    return { isLoading, error, data, getRoles }
}