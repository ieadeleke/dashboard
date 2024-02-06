import { useState } from "react"
import { useApi } from "../index"
import { GetTransactionsParams } from "@/utils/services/transactions/types"
import { TransactionService } from "@/utils/services/transactions"
import { GroupedTransactions, Transaction } from "@/models/transactions"

export const useFetchGroupTranscations = () => {
    const [data, setData] = useState<GroupedTransactions[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchGroupTransactions(params: GetTransactionsParams) {
        setData([])
        const response = await execute(async () => await TransactionService().getGroupedTransactions(params))
        if (response) {
            setData(response.transactions)
        }
    }

    return { isLoading, error, data, fetchGroupTransactions }
}