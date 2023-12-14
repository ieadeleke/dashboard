import { request, RequestConfig } from "../../request"
import { GetAllOperatorsResponse, GetOperatorsRequestParams, SuspendOperatorParams, SuspendOperatorResponse } from "./types"


export function OperatorsService(config?: RequestConfig) {

    async function getOperators(params?: GetOperatorsRequestParams) {
        const { data } = await request(`api/v1/admin/user/GetAllUsers?page=${params?.page || 1}`, "PUT", {
            ...config,
            body: {
                profileType: params?.profileType
            }
        })
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