import { useState } from "react"
import { useApi } from "../index"
import { MDAService } from "@/utils/services/mda"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { GetAllMDAsParams, GetAllMDAsResponse, SearchMDAResponse } from "@/utils/services/mda/types"
import { SearchAgentParams } from "@/utils/services/agents/types"

export const useSearchMDA = () => {
    const [data, setData] = useState<SearchMDAResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function searchMDA(params: SearchAgentParams) {
        setData(null)
        const response = await execute(async () => await MDAService().searchMDAByKeyword(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, searchMDA }
}