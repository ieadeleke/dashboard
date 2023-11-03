import { ApiResponse } from "@/models";
import { RecentActivities } from "@/models/activities/ActivitiesResponse";
import { User } from "@/models/users";

export type RecentActivtiesResponse = ApiResponse & RecentActivities

export type AdminActivitiesResponse = ApiResponse & {
    count: number,
    status: string,
    AdminActivities: [
        {
            _id: string,
            staffId : {
                _id: string,
                personalInfo: User
            }
            event: "Login",
            createdAt: string
        }
    ]
}