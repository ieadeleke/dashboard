import { useState } from "react"
import { useApi } from "../index"
import { FleetService } from "@/utils/services/fleets"
import { SuspendFleetParams, SuspendFleetResponse } from "@/utils/services/fleets/types"

export const useSuspendFleet = () => {
    const [data, setData] = useState<SuspendFleetResponse | null>(null)
    const { isLoading, error, execute } = useApi()

    async function suspendFleet(payload: SuspendFleetParams) {
        setData(null)
        const response = await execute(async () => await FleetService().suspendFleet(payload))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, suspendFleet }
}