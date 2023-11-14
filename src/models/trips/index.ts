import { Passenger } from "../passengers";

type TripStatus = "Arrived" | "Cancel" | "Onboarding" | "On-Transit"

export type Trip = {
    status: TripStatus,
    confirmManifest: boolean,
    _id: string,
    tripOrigin: string,
    tripDestination: string,
    Boat: string,
    passengers: Passenger[],
    captain: string,
    User: string,
    createdAt: string,
    updatedAt: string
}