import { formatFleet } from "@/utils/data/fleets"
import { request, RequestConfig } from "../../request"
import { GetAllFleetResponse } from "./types"


export function FleetService(config?: RequestConfig) {

    async function getAllFleets() {
        const { data } = await request(`api/v1/boat/admin/GetAllBoat`, "GET", config)
        const _data = (data as GetAllFleetResponse)
        return Object.assign({}, _data, {
            Boats: _data.Boats.map((boat) => formatFleet(boat))
        })
    }

    return {
        getAllFleets
    }

}