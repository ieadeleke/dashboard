import { formatFleet } from "@/utils/data/fleets"
import { request, RequestConfig } from "../../request"
import { AddFleetParams, AddFleetResponse, GetAllFleetResponse, GetFleetsRequestParams, SuspendFleetParams, SuspendFleetResponse, VerifyFleetParams, VerifyFleetResponse } from "./types"


export function FleetService(config?: RequestConfig) {

    async function getAllFleets(params?: GetFleetsRequestParams) {
        const { data } = await request(`api/v1/boat/admin/GetAllBoat?page=${params?.page || 1}`, "GET", config)
        const _data = (data as GetAllFleetResponse)
        return Object.assign({}, _data, {
            Boats: _data.Boats.map((boat) => formatFleet(boat))
        })
    }

    async function addFleet(payload: AddFleetParams) {
        const { data } = await request(`api/v1/boat/admin/AddBoat`, "POST", {
            body: payload
        })
        const _data = (data as AddFleetResponse)
        return Object.assign({}, _data, {
            Boat: (formatFleet(_data.Boat))
        })
    }

    async function verifyFleet(payload: VerifyFleetParams) {
        const { data } = await request(`api/v1/boat/admin/VerifyBoat`, "PUT", {
            body: payload
        })
        const _data = (data as VerifyFleetResponse)
        return _data
    }

    async function suspendFleet(payload: SuspendFleetParams) {
        const { data } = await request(`api/v1/boat/admin/SuspendBoat`, "PUT", {
            body: payload
        })
        const _data = (data as SuspendFleetResponse)
        return _data
    }

    return {
        getAllFleets,
        verifyFleet,
        suspendFleet,
        addFleet
    }

}