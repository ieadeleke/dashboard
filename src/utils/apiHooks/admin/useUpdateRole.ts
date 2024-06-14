import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { UpdateRole } from "@/utils/services/admin/types"


export const useUpdateRole = () => {
    const [data, setData] = useState<any | null>(null)
    const { isLoading, error, execute } = useApi()

    async function updateRole(params: UpdateRole) {
        setData(null)
        const response = await execute(async () => await AdminService().updateRole(params))
        if (response) {
            setData(response.Role)
        }
    }

    return { isLoading, error, data, updateRole }
}