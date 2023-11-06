import { ApiResponse } from "..";

export type GetDashboardStatistics = ApiResponse & {
    totalBoat: number,
    totalTrip: number,
    totalIncident: number,
    totalUser: number
    Trips: Record<string, number>
}

export type RecentActivity = {
    _id: string,
    tripId: string,
    event: string,
    boatNo: string,
    createdAt: string
}

export type RecentActivities = {
    Activities: RecentActivity[],
    count: number
}