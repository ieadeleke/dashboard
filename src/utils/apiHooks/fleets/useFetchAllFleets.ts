import { useState } from "react"
import { useApi } from "../index"
import { Fleet } from "@/models/fleets"
import { FleetService } from "@/utils/services/fleets"

export const useFetchAllFleets = () => {
    const [data, setData] = useState<Fleet[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchAllFleets() {
        setData([])
        const response = await execute(async () => await FleetService().getAllFleets())
        if (response) {
            setData(response.Boats)
        }
    }

    return { isLoading, error, data, fetchAllFleets }
}