import { request, RequestConfig } from "../../request"
import { CreateRoleParams, CreateRoleResponse, GetPrivilegesResponse, GetRolesResponse } from "./types"


export function RoleService(config?: RequestConfig) {

    async function getAllPrivileges() {
        const { data } = await request(`api/v1/admin/GetPrivileges`, "GET")
        const _data = data as GetPrivilegesResponse
        return _data
    }

    async function createRole(payload: CreateRoleParams) {
        const { data } = await request(`api/v1/admin/CreateRole`, "POST", {
            body: payload
        })
        const _data = data as CreateRoleResponse
        return _data
    }

    async function getAllRoles() {
        const { data } = await request(`api/v1/admin/GetRoles`, "GET")
        const _data = data as GetRolesResponse
        return _data
    }

    return {
        createRole,
        getAllPrivileges,
        getAllRoles
    }

}