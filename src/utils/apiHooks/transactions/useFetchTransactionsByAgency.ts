import { useState } from "react"
import { useApi } from "../index"
import { GetTransactionByAgencyParams } from "@/utils/services/transactions/types"
import { TransactionService } from "@/utils/services/transactions"
import { Transaction } from "@/models/transactions"

export const useFetchTransactionsByAgency = () => {
    const [data, setData] = useState<Transaction[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchTransactionsByAgency(params: GetTransactionByAgencyParams) {
        setData([])
        const response = await execute(async () => await TransactionService().getTransactionsByAgency(params))
        if (response) {
            setData(response.Transaction)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, fetchTransactionsByAgency, count }
}