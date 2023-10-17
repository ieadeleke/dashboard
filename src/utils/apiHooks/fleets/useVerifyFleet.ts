import { useState } from "react"
import { useApi } from "../index"
import { FleetService } from "@/utils/services/fleets"
import { VerifyFleetParams, VerifyFleetResponse } from "@/utils/services/fleets/types"

export const useVerifyFleet = () => {
    const [data, setData] = useState<VerifyFleetResponse | null>(null)
    const { isLoading, error, execute } = useApi()

    async function verifyFleet(payload: VerifyFleetParams) {
        setData(null)
        const response = await execute(async () => await FleetService().verifyFleet(payload))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, verifyFleet }
}