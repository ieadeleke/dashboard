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
    User: {
        isActive: boolean,
        loginDisabled: boolean,
        loginCount: number,
        Boats: string[],
        _id: string,
        phoneNumber: string,
        firstName: string,
        lastName: string,
        email: string,
        createdAt: string,
        updatedAt: string,
        loginReTryTime: string
    },
    createdAt: string,
    updatedAt: string,
}