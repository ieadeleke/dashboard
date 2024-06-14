import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Profile } from "@/models/profile"
import { GetUserParams } from "@/utils/services/admin/types"


export const useGetUsers = () => {
    const [data, setData] = useState<Profile[]>([])
    const [count, setCount] = useState(0)
    const { isLoading, error, execute } = useApi()

    async function getUsers(params?: GetUserParams) {
        setData([])
        const response = await execute(async () => await AdminService().getUsers(params))
        if (response) {
            setData(response.Users)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, count, getUsers }
}