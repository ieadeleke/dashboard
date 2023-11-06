import { useState } from "react"
import { useApi } from "../index"
import { UpdateAdminRoleParams } from "@/utils/services/admins/types"
import { AdminService } from "@/utils/services/admins"

export const useUpdateAdminRole = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function updateAdminRole(payload: UpdateAdminRoleParams) {
        setData(null)
        const response = await execute(async () => await AdminService().updateAdminRole(payload))
        if (response) {
            setData("OK")
        }
    }

    function clearUpdatedData() {
        setData(null)
    }

    return { isLoading, error, data, clearUpdatedData, updateAdminRole }
}