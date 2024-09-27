import { useState } from "react"
import { useApi } from "../index"
import { MDAService } from "@/utils/services/mda"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { DisableMDAsResponse, ApproveMDAsParams, GetAllMDAsParams, AllowMDAsResponse, ApproveMDASplittingParams } from "@/utils/services/mda/types"

export const useAllowMDASplitting = () => {
    const [data, setData] = useState<AllowMDAsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function allowSplitting(params: ApproveMDASplittingParams) {
        setData(null)
        const response = await execute(async () => await MDAService().allowMDAConsultantSplitting(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, allowSplitting }
}