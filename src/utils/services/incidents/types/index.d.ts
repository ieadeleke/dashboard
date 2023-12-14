import { ApiResponse } from "@/models"
import { Incident } from "@/models/incidents"

export type GetIncidentRequestParams = {
    page?: number
}

export type GetAllIncidentsResponse = ApiResponse & {
    count: number,
    Incidents: Incident[]
}

export type AddReportIncident = {
    IncidentLocation: string,
    BoatName: string,
    BoatCapacity: number,
    RescuedNumber: number,
    MissingPerson: number,
    NumberOfInjury: number,
    AccidentCause: string,
    IncidentType: "Vessel" | "Object" | "Person",
    IncidentTime: string,
    BoatType?: string,
    Comment: string
}

export type AddReportIncidentResponse = ApiResponse & {
    
}

export type ApproveIncidentParams = {
    incidentId: string
}

export type ApproveIncidentResponse = ApiResponse & {
    
}