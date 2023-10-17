import { Fleet } from "@/models/fleets";
import { ADD_FLEETS, UPDATE_FLEET } from "@/redux/actions/fleets/fleet.action";
import { UpdateFleet } from "@/redux/actions/fleets/types";
import { bindActionCreators } from "@reduxjs/toolkit";
import storeFactory from "../../store";

export const fleetActions = bindActionCreators({
    addFleets: (payload: Fleet[]) => ({ type: ADD_FLEETS, payload }),
    updateFleet: (payload: UpdateFleet) => ({ type: UPDATE_FLEET, payload })
}, storeFactory().store.dispatch)
