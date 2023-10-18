import { useState } from "react"
import { useApi } from "../index"
import { InitiateTripParams } from "@/utils/services/trips/types"
import { Trip } from "@/models/trips"
import { TripService } from "@/utils/services/trips"

export const useInitiateTrip = () => {
    const [data, setData] = useState<Trip | null>(null)
    const { isLoading, error, execute } = useApi()

    async function initiateTrip(payload: InitiateTripParams) {
        setData(null)
        const response = await execute(async () => await TripService().initiateTrip(payload))
        if (response) {
            setData(response.Trip)
        }
    }

    return { isLoading, error, data, initiateTrip }
}