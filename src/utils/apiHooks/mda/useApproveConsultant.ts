import { useState } from "react"
import { useApi } from "../index"
import { MDAService } from "@/utils/services/mda"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { ApproveMDAResponse, ApproveMDAsParams, GetAllMDAsParams, GetAllMDAsResponse } from "@/utils/services/mda/types"

export const useApproveMDA = () => {
    const [data, setData] = useState<ApproveMDAResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function approveConsultant(params: ApproveMDAsParams) {
        setData(null)
        const response = await execute(async () => await MDAService().approveMDAConsultant(params))
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, approveConsultant }
}