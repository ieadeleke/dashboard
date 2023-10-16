import { formatFleet } from "@/utils/data/fleets"
import { request, RequestConfig } from "../../request"
import { AddFleetParams, AddFleetResponse, GetAllFleetResponse } from "./types"


export function FleetService(config?: RequestConfig) {

    async function getAllFleets() {
        const { data } = await request(`api/v1/boat/admin/GetAllBoat`, "GET", config)
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

    return {
        getAllFleets,
        addFleet
    }

}