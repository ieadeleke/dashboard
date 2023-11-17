import { useState } from "react"
import { useApi } from "../index"
import { Fleet } from "@/models/fleets"
import { FleetService } from "@/utils/services/fleets"
import { fleetActions } from "@/redux/reducers/fleets"
import { GetFleetsRequestParams } from "@/utils/services/fleets/types"

export const useFetchActiveFleets = () => {
    const [data, setData] = useState<Fleet[]>([])
    const [count, setCount] = useState(0)
    const { isLoading, error, execute } = useApi()

    async function fetchActiveFleets(params?: GetFleetsRequestParams) {
        setData([])
        const response = await execute(async () => await FleetService().getActiveFleets(params))
        if (response) {
            setCount(response.length)
            fleetActions.addFleets(response)
        }
    }

    return { isLoading, error, data, count, fetchActiveFleets }
}