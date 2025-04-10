import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { FetchAgentTransactionsParams, FetchAgentTransactionsResponse } from "@/utils/services/agents/types"

export const useFetchAgentTrans = () => {
    const [data, setData] = useState<FetchAgentTransactionsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function fetchWalletTrans(params: FetchAgentTransactionsParams) {
        setData(null)
        const response = await execute(async () => await AgentService().FetchAgentTransactionHistory(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, fetchWalletTrans }
}