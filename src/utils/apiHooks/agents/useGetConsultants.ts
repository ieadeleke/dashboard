import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { GetAllAgentsParams, GetAllAgentsResponse, GetAllConsultantsResponse } from "@/utils/services/agents/types"

export const useGetConsultants = () => {
    const [data, setData] = useState<GetAllConsultantsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function getConsultantList() {
        setData(null)
        const response = await execute(async () => await AgentService().getAllConsultants())
        if (response) {
            console.log(data);
            setData(response)
        }
    }

    return { isLoading, error, data, getConsultantList }
}