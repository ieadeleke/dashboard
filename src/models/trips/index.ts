import { Passenger } from "../passengers";

export type Trip = {
    status: string,
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