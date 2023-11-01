import { useState } from "react"
import { useApi } from "../index"
import { AddAdminParams } from "@/utils/services/admins/types"
import { AdminService } from "@/utils/services/admins"

export const useAddAdmin = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function addAdmin(payload: AddAdminParams) {
        setData(null)
        const response = await execute(async () => await AdminService().addAdmin(payload))
        if (response) {
            setData("OK")
        }
    }

    return { isLoading, error, data, addAdmin }
}