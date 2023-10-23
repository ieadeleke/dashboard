import { Divider } from "@/components/Divider"
import { LucideMoreHorizontal } from "lucide-react"
import { Chart } from "./activities/chart"
import { RecentActivities } from "./RecentActivities"

export const Activities = () => {
    return <div className="grid grid-cols-1 min-h-[380px] gap-2 md:grid-cols-[minmax(auto,60%),minmax(auto,40%)]">

        <div className="flex flex-col bg-white py-2 rounded-lg">
            <div className="flex px-4 py-4 items-center justify-between">
                <p className="text-base font-bold">Sale Statistics</p>


                {/* <div className="hidden lg:flex gap-4">
                    <div className="flex gap-2 items-center">
                        <div className="bg-[#3F3F3F] w-2 h-2 rounded-full" />
                        <p className="text-gray-600">Sales</p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <div className="bg-primary w-2 h-2 rounded-full" />
                        <p className="text-gray-600">Returns</p>
                    </div>
                </div> */}

                <LucideMoreHorizontal className="text-gray-500" />
            </div>

            <Divider />

            <div>
                <Chart />
            </div>
        </div>
        <RecentActivities />
    </div>
}