import { useState } from "react"
import { useApi } from "../index"
import { User } from "@/models/users"
import { UserService } from "@/utils/services/users"

export const useGetAllUsers = () => {
    const [data, setData] = useState<User[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchAllUsers() {
        setData([])
        const response = await execute(async () => await UserService().getAllUsers())
        if (response) {
            setData(response.Users)
        }
    }

    return { isLoading, error, data, fetchAllUsers }
}