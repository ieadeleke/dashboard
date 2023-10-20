import { ApiResponse } from "@/models"
import { Admin } from "@/models/admins"
import { Trip } from "@/models/trips"

export type InitiateTripParams = {
    tripOrigin: string,
    tripDestination: string,
    boatId: string
}

export type InitiateTripResponse = ApiResponse & {
    Trip: Trip
}

export type GetAdminResponse = ApiResponse & {
    count: number,
    Admins: Admin[]
}