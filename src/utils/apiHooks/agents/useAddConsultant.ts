import { useState } from "react"
import { useApi } from "../index"
import { AgentService } from "@/utils/services/agents"
import { AddNewConsultantParam, AddNewConsultantsResponse } from "@/utils/services/agents/types"

export const useAddConsultants = () => {
    const [data, setData] = useState<AddNewConsultantsResponse | null>(null);
    const { isLoading, error, execute } = useApi();

    async function addNewConsultant(param: AddNewConsultantParam) {
        setData(null)
        const response = await execute(async () => await AgentService().saveNewConsultant(param));
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, addNewConsultant }
}