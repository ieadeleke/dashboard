import { useState } from "react"
import { useApi } from "../index"
import { MDAService } from "@/utils/services/mda"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { ApproveMDAResponse, ApproveMDAsParams, ApproveMDASplittingParams, DisableMDAsResponse, GetAllMDAsParams, GetAllMDAsResponse } from "@/utils/services/mda/types"

export const useDisableMDAInternalBill = () => {
    const [data, setData] = useState<DisableMDAsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function disableMDAInternalBill(params: ApproveMDASplittingParams) {
        setData(null)
        const response = await execute(async () => await MDAService().disableMDAInternalBill(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, disableMDAInternalBill }
}