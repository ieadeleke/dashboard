import { Admin, Profile } from "@/models/profile"
import { request } from "../../request"
import { ApiResponse } from "../types"
import { AddStaff, AddStaffResponse, AdminResponse, CreateRole, CreateRoleResponse, DashboardInfoRepsonse, GetAdminsResponse, GetAllUsersResponse, GetPrivilegesResponse, GetReviewsByStatusParams, GetReviewsResponse, GetRolesResponse, GetUserParams, PublishReviewResponse, SuspendAdminResponse, UpdateRole, UpdateRoleResponse } from "./types"


export function AdminService() {

    async function createRole(params: CreateRole) {
        const response = await request({
            path: `v1/admin/CreateRole`,
            method: "POST",
            body: params
        })
        return response as CreateRoleResponse
    }

    async function updateRole(params: UpdateRole) {
        const response = await request({
            path: `v1/admin/UpdateRole`,
            method: "PUT",
            body: params
        })
        return response as UpdateRoleResponse
    }

    async function getRoles() {
        const response = await request({
            path: `v1/admin/GetRoles`,
            method: "GET"
        })
        return response as GetRolesResponse
    }

    async function getUsers(params?: GetUserParams) {
        const response = await request({
            path: `v1/admin/GetAllUsers?page=${params?.page ?? 1}`,
            method: "GET"
        })
        return response as GetAllUsersResponse
    }

    async function getPrivileges() {
        const response = await request({
            path: `v1/admin/GetPrivileges`,
            method: "GET"
        })
        return response as GetPrivilegesResponse
    }

    async function addStaff(params: AddStaff) {
        const response = await request({
            path: `v1/admin/AddStaff`,
            method: "POST",
            body: params
        })
        return response as AddStaffResponse
    }

    async function getDashboardInfo() {
        const response = await request({
            path: `v1/admin/DashboardInfo`,
            method: "GET"
        })
        return response as DashboardInfoRepsonse
    }

    async function suspendUser(params: { userId: string }) {
        const response = await request({
            path: `v1/admin/SuspendUser`,
            method: "PUT",
            body: params
        })
        return response as ApiResponse & { user: Profile }
    }

    async function unSuspendUser(params: { userId: string }) {
        const response = await request({
            path: `v1/admin/UnSuspendUser`,
            method: "PUT",
            body: params
        })
        return response as ApiResponse & { user: Profile }
    }

    async function getAdmins(params?: { page?: number }) {
        const response = await request({
            path: `v1/admin/GetStaffs?page=${params?.page ?? 1}`,
            method: "GET",
            body: params
        })
        const data = (response as GetAdminsResponse)
        return {
            Admins: data.Admins.map(fornatAdmin),
            count: data.count
        }
    }

    function fornatAdmin(admin: AdminResponse): Admin {
        return {
            _id: admin._id,
            email: admin.personalInfo.email,
            firstName: admin.personalInfo.firstName,
            lastName: admin.personalInfo.lastName,
            isActive: admin.isActive,
            privileges: admin.roleId?.roles ?? [],
            phoneNumber: admin.personalInfo.phoneNumber,
            ...(admin.roleId && {
                role: {
                    _id: admin.roleId._id,
                    roleName: admin.roleId.roleName
                }
            }),
            status: admin.status,
            superAdmin: admin.superAdmin
        }
    }

    async function suspendAdmin(params: { userId: string }) {
        const response = await request({
            path: `v1/admin/SuspendStaff`,
            method: "PUT",
            body: params
        })
        const data = response as SuspendAdminResponse
        return fornatAdmin({
            ...data.admin,
            roleId: undefined
        })
    }

    async function unSuspendAdmin(params: { userId: string }) {
        const response = await request({
            path: `v1/admin/UnSuspendStaff`,
            method: "PUT",
            body: params
        })
        const data = response as SuspendAdminResponse
        return fornatAdmin({
            ...data.admin,
            roleId: undefined
        })
    }

    async function getReviews(params?: GetReviewsByStatusParams) {
        const response = await request({
            path: `v1/review/GetReviewByStatus?page=${params?.page ?? 1}`,
            method: "PUT",
            body: params
        })
        return response as GetReviewsResponse
    }

    async function publishReview(params: { reviewId: string }) {
        const response = await request({
            path: `v1/review/PublishReview`,
            method: "PUT",
            body: params
        })
        return response as PublishReviewResponse
    }

    async function rejectReview(params: { reviewId: string }) {
        const response = await request({
            path: `v1/review/RejectReview`,
            method: "PUT",
            body: params
        })
        return response as PublishReviewResponse
    }


    return {
        addStaff,
        updateRole,
        createRole,
        getPrivileges,
        getRoles,
        getUsers,
        getDashboardInfo,
        suspendUser,
        unSuspendUser,
        getAdmins,
        suspendAdmin,
        unSuspendAdmin,
        getReviews,
        publishReview,
        rejectReview
    }
}