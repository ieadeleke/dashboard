import { ApiResponse } from "@/models";
import { Fleet } from "@/models/fleets";

export type GetAllFleetResponse  = ApiResponse & {
    Boats: Fleet[]
}