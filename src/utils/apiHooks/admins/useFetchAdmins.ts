import { useState } from "react"
import { useApi } from "../index"
import { Admin } from "@/models/admins"
import { AdminService } from "@/utils/services/admins"
import { GetAdminsRequestParams } from "@/utils/services/admins/types"

export const useFetchAdmins = () => {
    const [data, setData] = useState<Admin[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchAdmins(params?: GetAdminsRequestParams) {
        setData([])
        const response = await execute(async () => await AdminService().getAllAdmins(params))
        if (response) {
            setCount(response.count)
            setData(response.Admins)
        }
    }

    return { isLoading, error, data, count, fetchAdmins }
}