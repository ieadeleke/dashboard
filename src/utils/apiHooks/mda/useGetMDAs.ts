import { useState } from "react"
import { useApi } from "../index"
import { MDAService } from "@/utils/services/mda"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { GetAllMDAsParams, GetAllMDAsResponse } from "@/utils/services/mda/types"

export const useGetMDAs = () => {
    const [data, setData] = useState<GetAllMDAsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function getMDAList(params: GetAllMDAsParams) {
        setData(null)
        const response = await execute(async () => await MDAService().getAllMDAs(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, getMDAList }
}