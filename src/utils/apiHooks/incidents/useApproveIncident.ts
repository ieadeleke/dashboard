import { useState } from "react"
import { useApi } from "../index"
import {  ApproveIncidentParams } from "@/utils/services/incidents/types"
import { IncidentService } from "@/utils/services/incidents"

export const useApproveIncident = () => {
    const [isComplete, setIsComplete] = useState(false)
    const { isLoading, error, execute } = useApi()

    async function approveIncident(params: ApproveIncidentParams) {
        setIsComplete(false)
        const response = await execute(async () => await IncidentService().approveIncident(params))
        if (response) {
            setIsComplete(true)
        }
    }

    return { isLoading, error, isComplete, approveIncident }
}