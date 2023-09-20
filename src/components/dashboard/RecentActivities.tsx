import Button from "@/components/buttons"
import { Divider } from "@/components/Divider"
import { LucideMoreHorizontal } from "lucide-react"

const ActivityItem = () => {
    return <div className="px-2 py-2 cursor-pointer hover:bg-gray-50">
        <div className="flex">
            <div className="flex-1 text-sm">
                <p className="font-semibold">(Boat 098) <span className="text-gray-500">on route</span></p>
                <p className="text-gray-400">5 mins ago...</p>
            </div>

            <div />

            <Button variant="text" className="text-sm">View Details</Button>
        </div>
    </div>
}

export const RecentActivities = () => {
    return <div className="flex flex-col bg-white px-4 py-2 rounded-lg">
        <div className="flex px-2 py-4">
            <p className="text-base font-bold">Recent Activities</p>
            <div className="flex-1" />
            <LucideMoreHorizontal className="text-gray-500" />
        </div>

        <Divider />

        <div>
            {Array(6).fill(0).map((item, index) => <ActivityItem key={index} />)}
        </div>
    </div>
}