import { User } from "../users"

export type FleetStatus = "pending" | "suspended" | "active" | "unapproved"

export type Fleet = {
    status: FleetStatus,
    onTransit: boolean,
    suspend: boolean,
    verify: boolean,
    _id: string,
    regNumber: string,
    imgUrl: string,
    capacity: string,
    captains?: {
        _id: string,
        isActive: boolean,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
    }[],
    image: string,
    model: string,
    AddByAdmin: string,
    User: User,
    createdAt: string,
    updatedAt: string,
}