import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { AddStaff } from "@/utils/services/admin/types"


export const useAddStaff = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function addStaff(params: AddStaff) {
        setData(null)
        const response = await execute(async () => await AdminService().addStaff(params))
        if (response) {
            setData("response")
        }
    }

    return { isLoading, error, data, addStaff }
}