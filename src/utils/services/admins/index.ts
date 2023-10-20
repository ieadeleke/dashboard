import { request, RequestConfig } from "../../request"
import { GetAdminResponse } from "./types"


export function AdminService(config?: RequestConfig) {

    async function getAllAdmins() {
        const { data } = await request(`api/v1/admin/GetAllAdmins`, "GET")
        const _data = data as GetAdminResponse
        return _data
    }

    return {
        getAllAdmins
    }

}