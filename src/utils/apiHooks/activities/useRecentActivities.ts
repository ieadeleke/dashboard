import { useState } from "react"
import { useApi } from "../index"
import { ActivitiesService } from "@/utils/services/activity"
import { RecentActivity } from "@/models/activities/ActivitiesResponse"

export const useRecentActivities = () => {
    const [data, setData] = useState<RecentActivity[]>([])
    const { isLoading, error, execute } = useApi()

    async function getRecentActivities() {
        setData([])
        const response = await execute(async () => await ActivitiesService().getRecentActivities())
        if (response) {
            setData(response.Activities)
        }
    }

    return { isLoading, error, data, getRecentActivities }
}