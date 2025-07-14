import { useState } from "react"
import { useApi } from "../index"
import { GetTransactionByReferenceParams } from "@/utils/services/transactions/types"
import { TransactionService } from "@/utils/services/transactions"
import { Transaction } from "@/models/transactions"

export const useFetchTransactionsByReference = () => {
    const [data, setData] = useState<any>({})
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchTransactionsByReference(params: GetTransactionByReferenceParams) {
        setData([])
        const response = await execute(async () => await TransactionService().getTransactionsByReference(params))
        if (response) {
            setData({
                found: true,
                data: response.Transactions
            })
            setCount(response.count)
        }
    }

    return { isLoading, error, data, count, fetchTransactionsByReference }
}