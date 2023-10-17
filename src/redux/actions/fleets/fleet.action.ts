import { Fleet } from "@/models/fleets"
import { createAction } from "@reduxjs/toolkit"
import { UpdateFleet } from "./types"

export const ADD_FLEETS = "ADD_FLEETS"
export const UPDATE_FLEET = "UPDATE_FLEET"

export const AddFleetsAction = createAction<Fleet[]>(ADD_FLEETS)
export const UpdateFleetAction = createAction<UpdateFleet>(UPDATE_FLEET)