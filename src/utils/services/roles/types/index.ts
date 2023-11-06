import { ApiResponse } from "@/models"
import { Role } from "@/models/roles"

export type GetPrivilegesResponse = ApiResponse & {
    Roles: string[]
}

export type CreateRoleParams = {
    roleName: string,
    roles: string[]
}

export type CreateRoleResponse = ApiResponse & {
    Role: Role
}

export type GetRolesResponse = {
    AdminRole: Role[]
}