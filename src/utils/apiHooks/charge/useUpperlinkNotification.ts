import { useState } from "react"
import { useApi } from "../index"
import { ChargeService } from "@/utils/services/charge"
import { Payment } from "@/models/payment"
import { InitiatePaymentWithUpperLinkParams, UpperLinkPaymentNotificationParams } from "@/utils/services/charge/types"

export const useUpperlinkNotification = () => {
    const [data, setData] = useState<any | null>(null)
    const { isLoading, error, execute } = useApi()

    async function upperlinkNotification(params: UpperLinkPaymentNotificationParams) {
        setData(null)
        const response = await execute(async () => await ChargeService().upperLinkNotification(params))
        if (response) {
            // setData(response)
        }
    }

    return { isLoading, error, data, upperlinkNotification }
}