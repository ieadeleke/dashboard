import { useState } from "react"
import { useApi } from "../index"
import { Trip } from "@/models/trips"
import { TripService } from "@/utils/services/trips"

export const useFetchTrips = () => {
    const [data, setData] = useState<Trip[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchCompleteTrips() {
        setData([])
        const response = await execute(async () => await TripService().getCompletedTrips())
        if (response) {
            setData(response.Trips)
        }
    }

    async function fetchCancelledTrips() {
        setData([])
        const response = await execute(async () => await TripService().getCancelledTrips())
        if (response) {
            setData(response.Trips)
        }
    }

    async function fetchAllTrips() {
        setData([])
        const response = await execute(async () => await TripService().getAllTrips())
        if (response) {
            setData(response.Trips)
        }
    }

    async function fetchActiveTrips() {
        setData([])
        const response = await execute(async () => await TripService().getActiveTrips())
        if (response) {
            setData(response.Trips)
        }
    }


    return { isLoading, error, data, fetchCompleteTrips, fetchCancelledTrips, fetchAllTrips, fetchActiveTrips }
}