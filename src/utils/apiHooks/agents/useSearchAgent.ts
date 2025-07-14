import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { GetAllAgentsParams, GetAllAgentsResponse, SearchAgentParams, SearchAgentResponse } from "@/utils/services/agents/types"

export const useSearchAgent = () => {
    const [data, setData] = useState<SearchAgentResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function searchAgent(params: SearchAgentParams) {
        setData(null)
        const response = await execute(async () => await AgentService().searchAgent(params))
        if (response) {
            setData(response);
        }
    }

    return { isLoading, error, data, searchAgent }
}