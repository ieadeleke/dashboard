import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Role } from "@/models/profile"
import { CreateRole } from "@/utils/services/admin/types"


export const useCreateRole = () => {
    const [data, setData] = useState<Role | null>(null)
    const { isLoading, error, execute } = useApi()

    async function createRole(params: CreateRole) {
        setData(null)
        const response = await execute(async () => await AdminService().createRole(params))
        if (response) {
            setData(response.Role)
        }
    }

    return { isLoading, error, data, createRole }
}