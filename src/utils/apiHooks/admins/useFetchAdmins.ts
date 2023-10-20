import { useState } from "react"
import { useApi } from "../index"
import { Admin } from "@/models/admins"
import { AdminService } from "@/utils/services/admins"

export const useFetchAdmins = () => {
    const [data, setData] = useState<Admin[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchAdmins() {
        setData([])
        const response = await execute(async () => await AdminService().getAllAdmins())
        if (response) {
            setData(response.Admins)
        }
    }

    return { isLoading, error, data, fetchAdmins }
}