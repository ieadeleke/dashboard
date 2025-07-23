import { useState } from "react"
import { useApi } from "../index"
import { settlementService } from "@/utils/services/settlements"
import { GetCalculatedSettlementAccountsParams, GetSettlementAccountsParams } from "@/utils/services/settlements/types"
import { SettlementAccount } from "@/models/settlements"

export const useFetchCalculatedSettlementAccounts = () => {
    const [data, setData] = useState<any[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchCalculatedSettlementAccounts(params: GetCalculatedSettlementAccountsParams) {
        setData([])
        const response = await execute(async () => await settlementService.getCalculatedSettlementAccounts(params))
        if (response) {
            setData(response.Transaction)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, fetchCalculatedSettlementAccounts, count }
}