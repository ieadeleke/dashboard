import { Operator } from "@/models/operators"

export type GetAllOperatorsResponse = ApiResponse & {
    count: number,
    Users: User[]
}

export type SuspendOperatorParams = {
    userId: string
}

export type SuspendOperatorResponse = {
    user: Operator
}

export type GetOperatorsRequestParams = {
    page?: number,
    profileType: "vesselOwner" | "captain" | "deckhands"
}