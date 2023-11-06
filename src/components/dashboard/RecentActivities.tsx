import Button from "@/components/buttons"
import { Divider } from "@/components/Divider"
import { RecentActivity } from "@/models/activities/ActivitiesResponse"
import { useRecentActivities } from "@/utils/apiHooks/activities/useRecentActivities"
import { LucideMoreHorizontal } from "lucide-react"
import moment from "moment"
import { useRef } from "react"
import { useEffect } from "react"
import Empty from "../states/Empty"
import { NetworkRequestContainer } from "../states/NetworkRequestContainer"
import { RecentActvityDetailModal, RecentActvityDetailModalRef } from "./activities/RecentActivityDetail"

type ActivityItemProps = {
    data: RecentActivity
}

export const ActivityItem = (props: ActivityItemProps) => {
    const { data } = props
    const timestamp = moment(data.createdAt).fromNow()

    return <div className="px-2 py-2 cursor-pointer hover:bg-gray-50">
        <div className="flex">
            <div className="flex-1 text-sm">
                <p className="font-semibold">(Boat {data.boatNo}) <span className="text-gray-500">{data.event}</span></p>
                <p className="text-gray-400">{timestamp}...</p>
            </div>

            <div />

            <Button variant="text" className="text-sm">View Details</Button>
        </div>
    </div>
}

export const RecentActivities = () => {
    const { isLoading, data, error, getRecentActivities } = useRecentActivities()
    const recentActivityDetailRef = useRef<RecentActvityDetailModalRef>(null)

    useEffect(() => {
        getRecentActivities()
    }, [])

    function handleOpenActivityModal(activity: RecentActivity) {
        recentActivityDetailRef.current?.open({
            data: activity
        })
    }

    return <div className="flex flex-col min-h-[300px] bg-white px-4 py-2 rounded-lg">
        <RecentActvityDetailModal ref={recentActivityDetailRef} />
        <div className="flex px-2 py-4">
            <p className="text-base font-bold">Recent Activities</p>
            <div className="flex-1" />
            <LucideMoreHorizontal className="text-gray-500" />
        </div>

        <Divider />

        <NetworkRequestContainer isLoading={isLoading} error={error}>
            <div className="h-full">
                {data.length == 0 ? <Empty title="Nothing to show" message="List is empty   " /> : data.slice(0, 5).map((item) => <div key={item._id} onClick={() => handleOpenActivityModal(item)}>
                    <ActivityItem data={item} />
                </div>)}
            </div>
        </NetworkRequestContainer>
    </div>
}