import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { FetchAgentWalletParams, FetchAgentWalletResponse } from "@/utils/services/agents/types"

export const useFetchAgentWalletTrans = () => {
    const [data, setData] = useState<FetchAgentWalletResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function fetchAgentWalletTrans(params: FetchAgentWalletParams) {
        setData(null)
        const response = await execute(async () => await AgentService().FetchAgentWallet(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, fetchAgentWalletTrans }
}