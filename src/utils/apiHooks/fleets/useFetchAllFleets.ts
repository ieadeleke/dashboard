import { useState } from "react"
import { useApi } from "../index"
import { Fleet } from "@/models/fleets"
import { FleetService } from "@/utils/services/fleets"
import { fleetActions } from "@/redux/reducers/fleets"
import { errorHandler } from "@/utils/errorHandler"

export const useFetchAllFleets = () => {
    const [data, setData] = useState<Fleet[]>([])
    const [error, setError] = useState<string | null>(null)
    const { isLoading, execute } = useApi()
    const [isUnauthorized, setIsUnauthorized] = useState(false)

    async function fetchAllFleets() {
        setData([])
        setIsUnauthorized(false)
        const response = await execute(async () => await FleetService().getAllFleets(), {
            onError: (error) =>{
                const parsedError = errorHandler(error)
                if(parsedError.status == 401){
                    setIsUnauthorized(true)
                    return
                }
                setError(parsedError.message)
            }
        })
        if (response) {
            fleetActions.addFleets(response.Boats)
            setData(response.Boats)
        }
    }

    return { isLoading, error, data, isUnauthorized, fetchAllFleets }
}