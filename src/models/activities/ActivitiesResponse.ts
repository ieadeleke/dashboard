import { ApiResponse } from "..";

export type GetDashboardStatistics = ApiResponse & {
    totalBoat: number,
    totalTrip: number,
    totalIncident: number,
    totalUser: number
    Trips: Record<string, number>
}

export type RecentActivities = {
    Activities: string[],
    count: number
}