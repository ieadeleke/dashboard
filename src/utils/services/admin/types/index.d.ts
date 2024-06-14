import { Conversation } from '@/models/conversation'
import { ApiResponse } from '../../types'
import { Profile, Role } from '@/models/profile'
import { DashboardInfo } from '@/models/dashboard'
import { Review, ReviewStatus } from '@/models/reviews'

export type CreateRole = {
    roleName: string,
    roles: string[]
}

export type UpdateRole = {
    roleId: string,
    roleName: string,
    roles: string[]
}

export type AddStaff = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    roleId: string
}

export type AddStaffResponse = ApiResponse
export type UpdateRoleResponse = ApiResponse & {
    Role: Role
}

export type DashboardInfoRepsonse = ApiResponse & DashboardInfo

export type GetUserParams = {
    page?: number
}

export type GetReviewsByStatusParams = {
    statusType: ReviewStatus,
    page?: number
}

export type CreateRoleResponse = ApiResponse & {
    Role: Role
}

export type GetRolesResponse = ApiResponse & {
    AdminRole: Role[]
}

export type GetAllUsersResponse = ApiResponse & {
    count: number,
    Users: Profile[]
}

export type GetPrivilegesResponse = ApiResponse & {
    Privileges: string[]
}

export type GetReviewsResponse = {
    count: number,
    Review: Review[]
}

export type PublishReviewResponse = {
    count: number,
    review: Review
}

export type AdminResponse = {
    superAdmin: boolean,
    isActive: boolean,
    status: boolean,
    _id: string,
    personalInfo: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string
    },
    roleId?: {
        roles: string[],
        roleName: string,
        _id: string
    }
}

export type GetAdminsResponse = ApiResponse & {
    count: number,
    Admins: AdminResponse[]
}

export type SuspendAdminResponse = ApiResponse & {
    admin: AdminResponse
}