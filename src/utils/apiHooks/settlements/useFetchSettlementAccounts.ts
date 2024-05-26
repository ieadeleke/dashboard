import { useState } from "react"
import { useApi } from "../index"
import { settlementService } from "@/utils/services/settlements"
import { GetSettlementAccountsParams } from "@/utils/services/settlements/types"
import { SettlementAccount } from "@/models/settlements"

export const useFetchSettlementAccounts = () => {
    const [data, setData] = useState<SettlementAccount[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchSettlementAccounts(params: GetSettlementAccountsParams) {
        setData([])
        const response = await execute(async () => await settlementService.getSettlementAccounts(params))
        if (response) {
            setData(response.SettlementAccounts)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, fetchSettlementAccounts, count }
}