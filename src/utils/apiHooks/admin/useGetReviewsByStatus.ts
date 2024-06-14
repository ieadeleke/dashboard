import { useState } from "react"
import { useApi } from ".."
import { AdminService } from "@/utils/services/admin/AdminService"
import { Review } from "@/models/reviews"
import { GetReviewsByStatusParams } from "@/utils/services/admin/types"


export const useGetReviewsByStatus = () => {
    const [data, setData] = useState<Review[]>([])
    const [count, setCount] = useState(0)
    const { isLoading, error, execute } = useApi()

    async function getReviewsByStatus(params: GetReviewsByStatusParams) {
        setData([])
        const response = await execute(async () => await AdminService().getReviews(params))
        if (response) {
            setData(response.Review)
            setCount(response.count)
        }
    }

    return { isLoading, error, data, count, getReviewsByStatus }
}