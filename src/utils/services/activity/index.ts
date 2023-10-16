import { GetDashboardStatistics } from "@/models/activities/ActivitiesResponse"
import { request, RequestConfig } from "../../request"
import { RecentActivtiesResponse } from "./types"


export function ActivitiesService(config?: RequestConfig) {

    async function getDashboardStatistics() {
        const { data } = await request(`api/v1/activities/Admin/DashboardStatics`, "GET", config)
        return data as GetDashboardStatistics
    }

    async function getRecentActivities() {
        const { data } = await request(`api/v1/activities/Admin/GetRecentActivities`, "GET", config)
        return data as RecentActivtiesResponse
    }

    return {
        getDashboardStatistics,
        getRecentActivities
    }

}