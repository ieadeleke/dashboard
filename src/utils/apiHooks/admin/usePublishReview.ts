import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Review } from "@/models/reviews"


export const usePublishReview = () => {
    const [data, setData] = useState<Review | null>(null)
    const { isLoading, error, execute } = useApi()

    async function publishReview(params: { reviewId: string }) {
        setData(null)
        const response = await execute(async () => await AdminService().publishReview(params))
        if (response) {
            setData(response.review)
        }
    }

    return { isLoading, error, data, publishReview }
}