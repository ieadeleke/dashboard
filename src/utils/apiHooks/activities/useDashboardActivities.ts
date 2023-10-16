import { useState } from "react"
import { useApi } from "../index"
import { ActivitiesService } from "@/utils/services/activity"
import { GetDashboardStatistics } from "@/models/activities/ActivitiesResponse"

export const useDashboardActivities = () => {
    const [data, setData] = useState<GetDashboardStatistics | null>(null)
    const { isLoading, error, execute } = useApi()

    async function getDashboardStatistics() {
        setData(null)
        const response = await execute(async () => await ActivitiesService().getDashboardStatistics())
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, getDashboardStatistics }
}