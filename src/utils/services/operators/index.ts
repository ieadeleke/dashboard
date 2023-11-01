import { request, RequestConfig } from "../../request"
import { GetAllOperatorsResponse, SuspendOperatorParams, SuspendOperatorResponse } from "./types"


export function OperatorsService(config?: RequestConfig) {

    async function getOperators() {
        const { data } = await request(`api/v1/admin/user/GetAllUsers`, "GET", config)
        const response = data as GetAllOperatorsResponse
        return response
    }

    async function suspendOperator(payload: SuspendOperatorParams) {
        const { data } = await request(`api/v1/admin/user/SuspendUser`, "PUT", {
            body: payload
        })
        const _data = data as SuspendOperatorResponse
        return _data
    }

    async function unSuspendOperator(payload: SuspendOperatorParams) {
        const { data } = await request(`api/v1/admin/user/UnSuspendUser`, "PUT", {
            body: payload
        })
        const _data = data as SuspendOperatorResponse
        return _data
    }
    
    return {
        getOperators,
        suspendOperator,
        unSuspendOperator
    }

}