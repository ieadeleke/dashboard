import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Review } from "@/models/reviews"


export const useRejectReview = () => {
    const [data, setData] = useState<Review | null>(null)
    const { isLoading, error, execute } = useApi()

    async function rejectReview(params: { reviewId: string }) {
        setData(null)
        const response = await execute(async () => await AdminService().rejectReview(params))
        if (response) {
            setData(response.review)
        }
    }

    return { isLoading, error, data, rejectReview }
}