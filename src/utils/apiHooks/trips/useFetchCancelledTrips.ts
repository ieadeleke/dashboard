import { useState } from "react"
import { useApi } from "../index"
import { Trip } from "@/models/trips"
import { TripService } from "@/utils/services/trips"

export const useFetchCancelledTrips = () => {
    const [data, setData] = useState<Trip[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchCancelledTrips() {
        setData([])
        const response = await execute(async () => await TripService().getCancelledTrips())
        if (response) {
            setData(response.Trips)
        }
    }

    return { isLoading, error, data, fetchCancelledTrips }
}