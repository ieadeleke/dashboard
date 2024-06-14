import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"


export const useGetPrivileges = () => {
    const [data, setData] = useState<string[]>([])
    const { isLoading, error, execute } = useApi()

    async function getPrivileges() {
        setData([])
        const response = await execute(async () => await AdminService().getPrivileges())
        if (response) {
            setData(response.Privileges)
        }
    }

    return { isLoading, error, data, getPrivileges }
}