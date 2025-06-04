import { useState } from "react"
import { useApi } from "../index"
import { TransactionService } from "@/utils/services/transactions"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"

export const useDashboardInfoDownload = () => {
    const [data, setData] = useState<DashboardInfoResponseParams | null>(null)
    const { isLoading, error, execute } = useApi()

    async function getSummaryDownloadInfo() {
        setData(null)
        const response = await execute(async () => await TransactionService().dashboardInfoDownload());
        console.log(response);
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, getSummaryDownloadInfo }
}