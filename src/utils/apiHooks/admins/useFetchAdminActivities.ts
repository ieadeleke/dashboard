import { useState } from "react"
import { useApi } from "../index"
import { AdminActivity } from "@/models/activities/AdminActivity"
import { ActivitiesService } from "@/utils/services/activity"
import { DEFAULT_PROFILE_URL } from "@/utils/constants/strings"

export const useFetchAdminActivities = () => {
    const [data, setData] = useState<AdminActivity[]>([])
    const { isLoading, error, execute } = useApi()

    async function fetchAdminActivities() {
        setData([])
        const response = await execute(async () => await ActivitiesService().getAdminActivities())
        if (response) {
            setData(response.AdminActivities.map((item) => ({
                id: item._id,
                staffId: item.staffId._id,
                profile_image:DEFAULT_PROFILE_URL,
                firstname: item.staffId.personalInfo.firstName,
                lastname: item.staffId.personalInfo.lastName,
                email: item.staffId.personalInfo.email,
                event: item.event
            })))
        }
    }

    return { isLoading, error, data, fetchAdminActivities }
}