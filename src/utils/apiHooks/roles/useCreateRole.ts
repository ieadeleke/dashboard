import { useState } from "react"
import { useApi } from "../index"
import { RoleService } from "@/utils/services/roles"
import { Role } from "@/models/roles"
import { CreateRoleParams } from "@/utils/services/roles/types"

export const useCreateRole = () => {
    const [data, setData] = useState<Role | null>(null)
    const { isLoading, error, execute } = useApi()

    async function createRole(payload: CreateRoleParams) {
        setData(null)
        const response = await execute(async () => await RoleService().createRole(payload))
        if (response) {
            setData(response.Role)
        }
    }

    return { isLoading, error, data, createRole }
}