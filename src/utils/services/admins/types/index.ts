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

export type AddAdminParams = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    roleId: string | null
}

export type GetAdminsRequestParams = {
    page?: number
}

export type UpdateAdminRoleParams = {
    roleId: string,
    userId: string
}