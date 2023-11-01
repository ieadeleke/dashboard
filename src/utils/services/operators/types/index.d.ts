import { Operator } from "@/models/operators"

export type GetAllOperatorsResponse = ApiResponse & {
    Users: User[]
}

export type SuspendOperatorParams = {
    userId: string
}

export type SuspendOperatorResponse = {
    user: Operator
}