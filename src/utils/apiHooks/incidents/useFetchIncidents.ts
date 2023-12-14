import { useState } from "react"
import { useApi } from "../index"
import { Incident } from "@/models/incidents"
import { GetIncidentRequestParams } from "@/utils/services/incidents/types"
import { IncidentService } from "@/utils/services/incidents"

export const useFetchIncidents = () => {
    const [data, setData] = useState<Incident[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchIncidents(params?: GetIncidentRequestParams) {
        setData([])
        const response = await execute(async () => await IncidentService().getIncidents(params))
        if (response) {
            setData(response.Incidents)
            setCount(response.count)
        }
    }

    async function fetchUnapprovedIncidents(params?: GetIncidentRequestParams) {
        setData([])
        const response = await execute(async () => await IncidentService().getUnApprovedIncidents(params))
        if (response) {
            setData(response.Incidents)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, count, fetchIncidents, fetchUnapprovedIncidents }
}