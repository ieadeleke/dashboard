import { request, RequestConfig } from "../../request"
import { AddReportIncident, AddReportIncidentResponse, GetAllIncidentsResponse, GetIncidentRequestParams } from "./types"


export function IncidentService(config?: RequestConfig) {

    async function getIncidents(params?: GetIncidentRequestParams) {
        const { data } = await request(`api/v1/incident/Admin/GetIncidents?page=${params?.page || 1}`, "GET", {
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


    return {
        getIncidents,
        createIncident
    }

}