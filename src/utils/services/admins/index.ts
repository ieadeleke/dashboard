import { request, RequestConfig } from "../../request"
import { GetAdminResponse, SuspendAdminParams, SuspendAdminResponse } from "./types"


export function AdminService(config?: RequestConfig) {

    async function getAllAdmins() {
        const { data } = await request(`api/v1/admin/GetAllAdmins`, "GET")
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

    return {
        getAllAdmins,
        suspendAdmin,
        unSuspendAdmin
    }

}