import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { GetAllAgentsLoanParams, GetAllAgentsParams, GetAllAgentsResponse } from "@/utils/services/agents/types"

export const useGetAgentsLoanHistory = () => {
    const [data, setData] = useState<any>(null);
    const { isLoading, error, execute } = useApi();

    async function getAgentList(params: GetAllAgentsLoanParams) {
        setData(null)
        const response = await execute(async () => await AgentService().getAllAgentsLoans(params))
        if (response) {
            setData({
                found: true,
                data: response.loanRequests
            })
        }
    }

    return { isLoading, error, data, getAgentList }
}