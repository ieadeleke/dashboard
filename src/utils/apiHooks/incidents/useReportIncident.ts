import { useState } from "react"
import { useApi } from "../index"
import { AddReportIncident } from "@/utils/services/incidents/types"
import { IncidentService } from "@/utils/services/incidents"

export const useReportIncident = () => {
    const [isComplete, setIsComplete] = useState(false)
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function reportIncident(params: AddReportIncident) {
        setIsComplete(false)
        const response = await execute(async () => await IncidentService().createIncident(params))
        if (response) {
            setIsComplete(true)
            setCount(response.count)
        }
    }

    return { isLoading, error, isComplete, count, reportIncident }
}