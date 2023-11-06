import { useState } from "react"
import { useApi } from "../index"
import { Trip } from "@/models/trips"
import { GetTripsRequestParams, TripService } from "@/utils/services/trips"

export const useFetchTrips = () => {
    const [data, setData] = useState<Trip[]>([])
    const [count, setCount] = useState(0)
    const { isLoading, error, execute } = useApi()

    async function fetchCompleteTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getCompletedTrips(params))
        if (response) {
            setData(response.Trips)
            setCount(response.count)
        }
    }

    async function fetchCancelledTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getCancelledTrips(params))
        if (response) {
            setData(response.Trips)
            setCount(response.count)
        }
    }

    async function fetchAllTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getAllTrips(params))
        if (response) {
            setData(response.Trips)
            setCount(response.count)
        }
    }

    async function fetchActiveTrips(params?: GetTripsRequestParams) {
        setData([])
        const response = await execute(async () => await TripService().getActiveTrips(params))
        if (response) {
            setData(response.Trips)
            setCount(response.count)
        }
    }


    return { isLoading, error, data, count, fetchCompleteTrips, fetchCancelledTrips, fetchAllTrips, fetchActiveTrips }
}