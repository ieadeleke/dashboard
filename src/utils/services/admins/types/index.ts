import { ApiResponse } from "@/models"
import { Admin } from "@/models/admins"

export type GetAdminResponse = ApiResponse & {
    count: number,
    Admins: Admin[]
}

export type SuspendAdminParams = {
    userId: string
}

export type SuspendAdminResponse = {
    user: Admin
}