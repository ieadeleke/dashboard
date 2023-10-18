import { formatTrips } from "@/utils/data/trip"
import { request, RequestConfig } from "../../request"
import { GetTripResponse, InitiateTripParams, InitiateTripResponse } from "./types"


export function TripService(config?: RequestConfig) {

    async function initiateTrip(payload: InitiateTripParams) {
        const { data } = await request(`api/v1/Trip/InitialStartTrip`, "POST", {
            body: payload
        })
        return data as InitiateTripResponse
    }

    async function getAllTrips() {
        const { data } = await request(`api/v1/trip/admin/GetAllTrips?page=1`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getActiveTrips() {
        const { data } = await request(`api/v1/trip/admin/GetAllOnTransitTrips?page=1`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getIncidentTrips() {
        const { data } = await request(`api/v1/trip/admin/GetAllIncidentTrips?page=1`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getCompletedTrips() {
        const { data } = await request(`api/v1/trip/admin/GetAllArrivedTrips?page=1`, "GET")
        const _data = data as GetTripResponse
        return Object.assign({}, _data, {
            Trips: formatTrips(_data.Trips)
        })
    }

    async function getCancelledTrips() {
        const { data } = await request(`api/v1/trip/admin/GetAllCancel?page=1`, "GET")
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
        getIncidentTrips
    }

}