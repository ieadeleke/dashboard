import { useState } from "react"
import { useApi } from "../index"
import { Fleet } from "@/models/fleets"
import { FleetService } from "@/utils/services/fleets"
import { AddFleetParams } from "@/utils/services/fleets/types"

export const useAddFleet = () => {
    const [data, setData] = useState<Fleet | null>(null)
    const { isLoading, error, execute } = useApi()

    async function addFleet(payload: AddFleetParams) {
        setData(null)
        const response = await execute(async () => await FleetService().addFleet(payload))
        if (response) {
            setData(response.Boat)
        }
    }

    return { isLoading, error, data, addFleet }
}