import { useState } from "react"
import { useApi } from "../index"
import { Role } from "@/models/roles"
import { RoleService } from "@/utils/services/roles"

export const useFetchRoles = () => {
    const [data, setData] = useState<Role[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchRoles() {
        setData([])
        const response = await execute(async () => await RoleService().getAllRoles())
        if (response) {
            setData(response.AdminRole)
        }
    }

    return { isLoading, error, data, fetchRoles }
}