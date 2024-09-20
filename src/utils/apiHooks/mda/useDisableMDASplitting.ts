import { useState } from "react"
import { useApi } from "../index"
import { MDAService } from "@/utils/services/mda"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { DisableMDAsResponse, ApproveMDAsParams, GetAllMDAsParams } from "@/utils/services/mda/types"

export const useDisableMDASplitting = () => {
    const [data, setData] = useState<DisableMDAsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function disableSpliting(params: ApproveMDAsParams) {
        setData(null)
        const response = await execute(async () => await MDAService().disableMDAConsultantSplitting(params))
        if (response) {
            console.log(response);
            setData(response)
        }
    }

    return { isLoading, error, data, disableSpliting }
}