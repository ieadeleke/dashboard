import { useState } from "react"
import { useApi } from "../index"
import { SuspendOperatorParams } from "@/utils/services/operators/types"
import { OperatorsService } from "@/utils/services/operators"
import { Operator } from "@/models/operators"

export const useUnSuspendOperator = () => {
    const [data, setData] = useState<Operator | null>(null)
    const { isLoading, error, execute } = useApi()

    async function unSuspendOperator(payload: SuspendOperatorParams) {
        setData(null)
        const response = await execute(async () => await OperatorsService().unSuspendOperator(payload))
        if (response) {
            setData(response.user)
        }
    }

    return { isLoading, error, data, unSuspendOperator }
}