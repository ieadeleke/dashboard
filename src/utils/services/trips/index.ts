import { formatTrips } from "@/utils/data/trip"
import { request, RequestConfig } from "../../request"
import { GetTripResponse, InitiateTripParams, InitiateTripResponse } from "./types"

export type GetTripsRequestParams = {
    page?: number
}

export function TripService(config?: RequestConfig) {

    async function initiateTrip(payload: InitiateTripParams) {
        const { data } = await request(`api/v1/Trip/InitialStartTrip`, "POST", {
            body: payload
        })
        return data as InitiateTripResponse
    }

    async function getAllTrips(params?: GetTripsRequestParams) {
        const { data } = await request(`api/v1/trip/admin/GetAllTrips?page=${params?.page || 1}`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getActiveTrips(params?: GetTripsRequestParams) {
        const { data } = await request(`api/v1/trip/admin/GetAllOnTransitTrips?page=${params?.page || 1}`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getIncidentTrips(params?: GetTripsRequestParams) {
        const { data } = await request(`api/v1/trip/admin/GetAllIncidentTrips?page=${params?.page || 1}`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getCompletedTrips(params?: GetTripsRequestParams) {
        const { data } = await request(`api/v1/trip/admin/GetAllArrivedTrips?page=${params?.page || 1}`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getPendingTrips(params?: GetTripsRequestParams) {
        const { data } = await request(`api/v1/trip/admin/GetAllOnbardingTrips?page=${params?.page || 1}`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getCancelledTrips(params?: GetTripsRequestParams) {
        const { data } = await request(`api/v1/trip/admin/GetAllCancel?page=${params?.page || 1}`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    return {
        initiateTrip,
        getAllTrips,
        getCancelledTrips,
        getCompletedTrips,
        getActiveTrips,
        getPendingTrips,
        getIncidentTrips
    }

}