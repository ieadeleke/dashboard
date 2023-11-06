import { useState } from "react"
import { useApi } from "../index"
import { RoleService } from "@/utils/services/roles"

export const useFetchPrivileges = () => {
    const [data, setData] = useState<string[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchPrivileges() {
        setData([])
        const response = await execute(async () => await RoleService().getAllPrivileges())
        if (response) {
            setData(response.Roles)
        }
    }

    return { isLoading, error, data, fetchPrivileges }
}