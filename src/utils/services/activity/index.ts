import { GetDashboardStatistics } from "@/models/activities/ActivitiesResponse"
import { request, RequestConfig } from "../../request"


export function ActivitiesService(config?: RequestConfig) {

    async function getDashboardStatistics() {
        const { data } = await request(`api/v1/activities/Admin/DashboardStatics`, "GET", config)
        return data as GetDashboardStatistics
    }

    return {
        getDashboardStatistics 
    }

}