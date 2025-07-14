import { useState } from "react"
import { useApi } from "../index"
import { GetTransactionByReferenceParams } from "@/utils/services/transactions/types"
import { TransactionService } from "@/utils/services/transactions"
import { Transaction } from "@/models/transactions"

export const useFetchTransactionsByPaymentReference = () => {
    const [data, setData] = useState<Transaction[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState<number | undefined>(0)

    async function fetchTransactionsByPaymentReference(params: GetTransactionByReferenceParams) {
        setData([])
        const response = await execute(async () => await TransactionService().getTransactionsByPaymentReference(params))
        if (response) {
            setData(response.Transaction)
            setCount(response?.count)
        }
    }

    return { isLoading, error, data, count, fetchTransactionsByPaymentReference }
}