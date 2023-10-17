import { ApiResponse } from "@/models";
import { Fleet } from "@/models/fleets";

export type GetAllFleetResponse  = ApiResponse & {
    Boats: Fleet[]
}

export type AddFleetParams = {
    userId: string,
    regNumber: string,
    model: string
}

export type AddFleetResponse = ApiResponse & {
    Boat: Fleet
}

export type VerifyFleetResponse = ApiResponse & {

}

export type VerifyFleetParams = {
    boatId: string
}