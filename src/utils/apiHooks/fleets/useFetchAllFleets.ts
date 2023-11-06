import { useState } from "react"
import { useApi } from "../index"
import { Fleet } from "@/models/fleets"
import { FleetService } from "@/utils/services/fleets"
import { fleetActions } from "@/redux/reducers/fleets"
import { GetFleetsRequestParams } from "@/utils/services/fleets/types"

export const useFetchAllFleets = () => {
    const [data, setData] = useState<Fleet[]>([])
    const [count, setCount] = useState(0)
    const { isLoading, error, execute } = useApi()

    async function fetchAllFleets(params?: GetFleetsRequestParams) {
        setData([])
        const response = await execute(async () => await FleetService().getAllFleets(params))
        if (response) {
            setCount(response.count)
            fleetActions.addFleets(response.Boats)
            setData(response.Boats)
        }
    }

    return { isLoading, error, data, count, fetchAllFleets }
}