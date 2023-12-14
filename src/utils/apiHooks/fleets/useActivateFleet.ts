import { useState } from "react"
import { useApi } from "../index"
import { FleetService } from "@/utils/services/fleets"
import { ActivateFleetParams, VerifyFleetResponse } from "@/utils/services/fleets/types"

export const useActivateFleet = () => {
    const [data, setData] = useState<VerifyFleetResponse | null>(null)
    const { isLoading, error, execute } = useApi()

    async function activateFleet(payload: ActivateFleetParams) {
        setData(null)
        const response = await execute(async () => await FleetService().activateFleet(payload))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, activateFleet }
}