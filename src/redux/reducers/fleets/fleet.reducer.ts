import { Fleet } from "@/models/fleets";
import { AnyAction } from "@reduxjs/toolkit";
import { AddFleetsAction, UpdateFleetAction } from "../../actions/fleets/fleet.action";

const initialState: Fleet[] = []

export function fleetReducer(state = initialState, action: AnyAction) {
    if (AddFleetsAction.match(action)) {
        const value = action.payload

        //replace existing data with new data
        const filteredData = state.map((item) => value.find((fleet) => fleet._id == item._id) || item)
        return filteredData.concat(value).filter((v, i, a) => a.findIndex(v2 => (v2._id === v._id)) === i)
    } else if (UpdateFleetAction.match(action)) {
        const value = action.payload

        return state.map((item) => {
            if (item._id == value.fleet_id) {
                return { ...item, ...value.data }
            } else return item
        })
    } else return state
}