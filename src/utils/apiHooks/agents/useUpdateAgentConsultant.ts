import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { UpdateConsultantParam, UpdateConsultantsResponse } from "@/utils/services/agents/types";

export const useUpdateAgentConsultants = () => {
    const [data, setData] = useState<UpdateConsultantsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function updateAgentConsultant(param: UpdateConsultantParam) {
        setData(null)
        const response = await execute(async () => await AgentService().updateAgentConsultant(param));
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, updateAgentConsultant }
}