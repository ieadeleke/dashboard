import { User } from "../users"

export type FleetStatus = "pending" | "suspended" | "active"

export type Fleet = {
    status: FleetStatus,
    onTransit: boolean,
    suspend: boolean,
    verify: boolean,
    _id: string,
    regNumber: string,
    image: string,
    model: string,
    AddByAdmin: string,
    User: User,
    createdAt: string,
    updatedAt: string,
}