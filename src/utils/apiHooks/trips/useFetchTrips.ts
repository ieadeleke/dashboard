import { useState } from "react"
import { useApi } from "../index"
import { Trip } from "@/models/trips"
import { GetTripsRequestParams, TripService } from "@/utils/services/trips"

export const useFetchTrips = () => {
    const [data, setData] = useState<Trip[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchCompleteTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getCompletedTrips(params))
        if (response) {
            setData(response.Trips)
        }
    }

    async function fetchCancelledTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getCancelledTrips(params))
        if (response) {
            setData(response.Trips)
        }
    }

    async function fetchAllTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getAllTrips(params))
        if (response) {
            setData(response.Trips)
        }
    }

    async function fetchActiveTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getActiveTrips(params))
        if (response) {
            setData(response.Trips)
        }
    }


    return { isLoading, error, data, fetchCompleteTrips, fetchCancelledTrips, fetchAllTrips, fetchActiveTrips }
}