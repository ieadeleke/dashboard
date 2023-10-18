import { useState } from "react"
import { useApi } from "../index"
import { Operator } from "@/models/operators"
import { OperatorsService } from "@/utils/services/operators"

export const useFetchOperators = () => {
    const [data, setData] = useState<Operator[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchOperators() {
        setData([])
        const response = await execute(async () => await OperatorsService().getOperators())
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, fetchOperators }
}