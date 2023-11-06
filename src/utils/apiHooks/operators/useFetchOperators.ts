import { useState } from "react"
import { useApi } from "../index"
import { Operator } from "@/models/operators"
import { OperatorsService } from "@/utils/services/operators"
import { GetOperatorsRequestParams } from "@/utils/services/operators/types"

export const useFetchOperators = () => {
    const [data, setData] = useState<Operator[]>([])
    const { isLoading, error, execute } = useApi()
    const [count, setCount] = useState(0)

    async function fetchOperators(params?: GetOperatorsRequestParams) {
        setData([])
        const response = await execute(async () => await OperatorsService().getOperators(params))
        if (response) {
            setData(response.Users)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, count, fetchOperators }
}