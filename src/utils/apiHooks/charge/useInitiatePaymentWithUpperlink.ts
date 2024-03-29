import { useState } from "react"
import { useApi } from "../index"
import { ChargeService } from "@/utils/services/charge"
import { Payment } from "@/models/payment"
import { InitiatePaymentWithUpperLinkParams } from "@/utils/services/charge/types"

export const useInitiatePaymentWithUpperlink = () => {
    const [data, setData] = useState<Payment | null>(null)
    const { isLoading, error, execute } = useApi()

    async function initiatePaymentWithUpperlink(params: InitiatePaymentWithUpperLinkParams) {
        setData(null)
        const response = await execute(async () => await ChargeService().initiatePaymentWithUpperlink(params))
        if (response) {
            // setData(response.Transaction)
        }
    }

    return { isLoading, error, data, initiatePaymentWithUpperlink }
}