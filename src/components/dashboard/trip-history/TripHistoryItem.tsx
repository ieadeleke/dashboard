import DiscIcon from '@/assets/icons/ic_history_disc.svg'
import { Divider } from '@/components/Divider'
import { Trip } from '@/models/trips'
import { TripStatus } from '@/utils/data/trip'
import { TripHistoryStatusChip } from './TripHistoryStatusChip'

type TripHistoryProps = {
    data: Trip
}

export const TripHistoryItem = (props: TripHistoryProps) => {
    const { data } = props

    return <div className="flex flex-col rounded-xl border bg-white px-6 py-6 cursor-pointer">

        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <DiscIcon className="w-7 h-7 text-text-normal" />
                    <p>{data.tripOrigin}</p>
                </div>

                <div className="flex items-center gap-4">
                    <DiscIcon className="w-7 h-7 text-primary" />
                    <p>{data.tripDestination}</p>
                </div>
            </div>

            <Divider className="bg-gray-200" />

            <div className="flex items-center">
                <p>Trip ID</p>
                <div className="flex-1" />
                <TripHistoryStatusChip status={data.status as TripStatus} />
            </div>
        </div>
    </div>
}