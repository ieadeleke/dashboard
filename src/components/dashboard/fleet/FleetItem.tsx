import { Avatar } from "@/components/image/Avatar"
import { Fleet } from "@/models/fleets"
import { DEFAULT_PROFILE_URL } from "@/utils/constants/strings"
import { parseFleetStatus } from "@/utils/data/fleets"


type FleetItemProps = {
    data: Fleet
}

export const FleetItem = (props: FleetItemProps) => {
    const { data } = props

    return <div className="flex flex-col gap-4">
        <img src={data.imgUrl.length > 0 ? data.imgUrl[0].url : undefined} className="bg-grey-200 object-cover object-center rounded-lg h-[400px]" />

        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-text-color text-xl md:text-2xl">{data.model}</h1>
                <p className="text-gray-600">{data.capacity ?? 0} Passengers</p>
            </div>

            <div className="flex items-center gap-2">
                <Avatar src={DEFAULT_PROFILE_URL} className="w-8 h-8" />
                <p>{data.User.firstName} {data.User.lastName}</p>
            </div>

            <p className="text-text-color font-bold">{parseFleetStatus(data.status)}</p>
        </div>
    </div>
}