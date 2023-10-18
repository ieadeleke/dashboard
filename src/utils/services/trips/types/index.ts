import { ApiResponse } from "@/models"
import { Trip } from "@/models/trips"

export type InitiateTripParams = {
    tripOrigin: string,
    tripDestination: string,
    boatId: string
}

export type InitiateTripResponse = ApiResponse & {
    Trip: Trip
}

export type GetTripResponse = ApiResponse & {
    count: number,
    Trips: Trip[]
}