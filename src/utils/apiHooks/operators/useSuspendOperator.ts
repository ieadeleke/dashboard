import { useState } from "react"
import { useApi } from "../index"
import { Operator } from "@/models/operators"
import { OperatorsService } from "@/utils/services/operators"
import { SuspendOperatorParams } from "@/utils/services/operators/types"

export const useSuspendOperator = () => {
    const [data, setData] = useState<Operator | null>(null)
    const { isLoading, error, execute } = useApi()

    async function suspendOperator(payload: SuspendOperatorParams) {
        setData(null)
        const response = await execute(async () => await OperatorsService().suspendOperator(payload))
        if (response) {
            setData(response.user)
        }
    }

    return { isLoading, error, data, suspendOperator }
}