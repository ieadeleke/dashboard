import { useState } from "react"
import { useApi } from "../index"
import { DownloadReportParams, GetTransactionByPaymentRefParams } from "@/utils/services/transactions/types"
import { TransactionService } from "@/utils/services/transactions"
import { Transaction } from "@/models/transactions"

export const useDownloadReport = () => {
    const [data, setData] = useState<string | null>(null)
    const { isLoading, error, execute } = useApi()

    async function downloadReport(params: DownloadReportParams) {
        setData(null)
        const response = await execute(async () => await TransactionService().downloadReport(params))
        if (response) {
            setData("response.Transaction")
        }
    }

    return { isLoading, error, data, downloadReport }
}