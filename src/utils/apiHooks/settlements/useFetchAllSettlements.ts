import { useState } from "react"
import { useApi } from "../index"
import { settlementService } from "@/utils/services/settlements"
import { GetAllSettlementsParams } from "@/utils/services/settlements/types"
import { Settlement } from "@/models/settlements"

export const useFetchAllSettlements = () => {
    const [data, setData] = useState<Settlement[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchAllSettlements(params: GetAllSettlementsParams) {
        setData([])
        const response = await execute(async () => await settlementService.getAllSettlements(params))
        if (response) {
            setData(response.Settlements.data)
            setCount(response.Settlements.meta.page_info.total)
        }
    }

    return { isLoading, error, data, fetchAllSettlements, count }
}