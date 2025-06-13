import { useState } from "react"
import { useApi } from "../index"
import { TransactionService } from "@/utils/services/transactions"
import { DashboardInfoResponseParams } from "@/utils/services/transactions/types"
import { GetTransactionsParams } from "@/utils/services/agents/types"

export const useGetConsultantCompanySummary = () => {
    const [data, setData] = useState<any>(null)
    const { isLoading, error, execute } = useApi();
    const [count, setCount] = useState(0);

    async function getConsultantCompany(params: GetTransactionsParams) {
        setData(null)
        const response = await execute(async () => await TransactionService().getConsultantCompanySummary(params))
        if (response) {
            setData({
                found: true,
                response
            })
            setCount(response.count)
        }
    }

    return { isLoading, error, data, getConsultantCompany, count }
}