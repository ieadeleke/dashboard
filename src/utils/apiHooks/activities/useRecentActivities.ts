import { useState } from "react"
import { useApi } from "../index"
import { ActivitiesService } from "@/utils/services/activity"
import { RecentActivities } from "@/models/activities/ActivitiesResponse"

export const useRecentActivities = () => {
    const [data, setData] = useState<RecentActivities | null>(null)
    const { isLoading, error, execute } = useApi()

    async function getRecentActivities() {
        setData(null)
        const response = await execute(async () => await ActivitiesService().getRecentActivities())
        if (response) {
            setData(response)
        }
    }

    return { isLoading, error, data, getRecentActivities }
}