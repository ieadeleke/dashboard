import { Avatar } from "@/components/image/Avatar"
import { DEFAULT_PROFILE_URL } from "@/utils/constants/strings"

export const FleetItem = () => {
    return <div className="flex flex-col gap-4">
        <img src="" className="bg-red-200 rounded-lg h-[400px]" />

        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-text-color text-xl md:text-2xl">Boat Name</h1>
                <p className="text-gray-600">216 Passengers</p>
            </div>

            <div className="flex items-center gap-2">
                <Avatar src={DEFAULT_PROFILE_URL} className="w-8 h-8" />
                <p>@m_alisson</p>
            </div>

            <p className="text-text-color font-bold">Active</p>
        </div>
    </div>
}