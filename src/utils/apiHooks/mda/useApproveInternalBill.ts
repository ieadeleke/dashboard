import { useState } from "react"
import { useApi } from "../index"
import { MDAService } from "@/utils/services/mda"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { ApproveMDAResponse, ApproveMDAsParams, ApproveMDASplittingParams, DisableMDAsResponse, GetAllMDAsParams, GetAllMDAsResponse } from "@/utils/services/mda/types"

export const useApproveMDAInternalBill = () => {
    const [data, setData] = useState<DisableMDAsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function approveMDAInternalBill(params: ApproveMDASplittingParams) {
        setData(null)
        const response = await execute(async () => await MDAService().approveMDAInternalBill(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, approveMDAInternalBill }
}