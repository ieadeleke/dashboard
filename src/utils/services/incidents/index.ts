import { request, RequestConfig } from "../../request"
import { AddReportIncident, AddReportIncidentResponse, ApproveIncidentParams, ApproveIncidentResponse, GetAllIncidentsResponse, GetIncidentRequestParams } from "./types"


export function IncidentService(config?: RequestConfig) {

    async function getIncidents(params?: GetIncidentRequestParams) {
        const { data } = await request(`api/v1/incident/Admin/GetIncidents?page=${params?.page || 1}`, "GET", {
            ...config
        })
        const response = data as GetAllIncidentsResponse
        return response
    }

    async function getUnApprovedIncidents(params?: GetIncidentRequestParams) {
        const { data } = await request(`api/v1/incident/Admin/GetUnConfirmIncidents?page=${params?.page || 1}`, "GET", {
            ...config
        })
        const response = data as GetAllIncidentsResponse
        return response
    }

    async function createIncident(params: AddReportIncident) {
        console.log(Object.assign({}, params, { Inspector: [] }))
        const { data } = await request(`api/v1/incident/Admin/AddReportIncident`, "POST", {
            ...config,
            body: Object.assign({}, params, { Inspector: [] })
        })
        const response = data as AddReportIncidentResponse
        return response
    }

    async function approveIncident(params: ApproveIncidentParams) {
        const { data } = await request(`api/v1/incident/Admin/ConfirmIncident`, "PUT", {
            ...config,
            body: Object.assign({}, params, { Inspector: [] })
        })
        const response = data as ApproveIncidentResponse
        return response
    }


    return {
        getIncidents,
        createIncident,
        approveIncident,
        getUnApprovedIncidents
    }

}