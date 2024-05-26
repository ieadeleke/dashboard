import { useState } from "react"
import { useApi } from "../index"
import { settlementService } from "@/utils/services/settlements"
import { Settlement } from "@/models/settlements"

export const useFetchSettlement = () => {
    const [data, setData] = useState<Settlement | null>(null)
    const { isLoading, error, execute } = useApi()

    async function fetchSettlement(id: string) {
        setData(null)
        const response = await execute(async () => await settlementService.getSettlement(id))
        if (response) {
            setData(response.Settlements.data)
        }
    }

    return { isLoading, error, data, fetchSettlement }
}