import { ApiResponse } from "@/models"
import { request, RequestConfig } from "../../request"
import { AddAdminParams, GetAdminResponse, GetAdminsRequestParams, SuspendAdminParams, SuspendAdminResponse, UpdateAdminRoleParams } from "./types"


export function AdminService(config?: RequestConfig) {

    async function getAllAdmins(params?: GetAdminsRequestParams) {
        const { data } = await request(`api/v1/admin/GetAllAdmins?page=${params?.page || 1}`, "GET")
        const _data = data as GetAdminResponse
        return _data
    }

    async function suspendAdmin(payload: SuspendAdminParams) {
        const { data } = await request(`api/v1/admin/SuspendAdmin`, "PUT", {
            body: payload
        })
        const _data = data as SuspendAdminResponse
        return _data
    }

    async function unSuspendAdmin(payload: SuspendAdminParams) {
        const { data } = await request(`api/v1/admin/UnSuspendAdmin`, "PUT", {
            body: payload
        })
        const _data = data as SuspendAdminResponse
        return _data
    }

    async function addAdmin(payload: AddAdminParams) {
        const { data } = await request(`api/v1/admin/AddStaff`, "POST", {
            body: payload
        })
        const _data = (data as ApiResponse & { status: string })
        return true
    }

    async function updateAdminRole(payload: UpdateAdminRoleParams) {
        const { data } = await request(`api/v1/admin/UpdateRole`, "PUT", {
            body: payload
        })
        const _data = (data as ApiResponse & { status: string })
        return true
    }

    return {
        getAllAdmins,
        suspendAdmin,
        unSuspendAdmin,
        addAdmin,
        updateAdminRole
    }

}