import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { AddNewConsultantParam, AddNewConsultantsResponse, UpdateLoanStatusParam } from "@/utils/services/agents/types"

export const useRejectLoan = () => {
    const [data, setData] = useState<any>(null);
    const { isLoading, error, execute } = useApi();

    async function rejectLoan(param: UpdateLoanStatusParam) {
        setData(null)
        const response = await execute(async () => await AgentService().rejectAgentLoanRequest(param));
        if (response) {
            setData({
                done: true,
                response
            })
        }
    }

    return { isLoading, error, data, rejectLoan }
}