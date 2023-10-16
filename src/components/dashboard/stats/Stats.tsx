import ShipLine from '@/assets/icons/ic_ship_line.svg'
import UsersIcon from '@/assets/icons/ic_users_line.svg'
import CautionIcon from '@/assets/icons/ic_caution.svg'
import HistoryIcon from '@/assets/icons/ic_history.svg'
import { StatItem } from "@/components/dashboard/stats/StatItem";
import Button from "@/components/buttons";
import { GetDashboardStatistics } from '@/models/activities/ActivitiesResponse';

type StatsProps = {
    data: GetDashboardStatistics
}

export const Stats = (props: StatsProps) => {
    const { data } = props

    return <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(auto,55%),minmax(auto,45%)] xl:grid-cols-[minmax(auto,60%),minmax(auto,40%)] lg:h-[320px]">
        <div style={{
            backgroundImage: `url(https://res.cloudinary.com/dfzhxlgll/image/upload/v1695210553/Rectangle_13_sfp8ss.png)`
        }} className="flex flex-col gap-4 w-full h-full bg-red-950 rounded-2xl px-3 py-12 md:px-6 lg:gap-6 lg:px-8 lg:py-12">
            <h1 className="font-bold text-2xl leading-[32px] text-white lg:leading-[64.8px] lg:text-[54px]">Lorem ipsum dolor sit amet</h1>

            <div className="flex gap-2">
                <Button variant="contained" className="bg-white font-semibold text-primary px-6 py-2">Discover</Button>
                <Button variant="outlined" className="px-8 py-2 font-semibold text-white border-white">Create</Button>
            </div>
        </div>

        <div className="w-full grid grid-cols-1 gap-2 px-2 lg:grid-cols-2 grid-rows-2 lg:h-full">

            <StatItem icon={ShipLine} name="Boats" count={data.totalBoat.toString()} colorAccent={'#EAFFE1'} color={`#00BD09`} />
            <StatItem icon={CautionIcon} name="Incidents" count={data.totalIncident.toString()} colorAccent={'#FFFBED'} color={`#FF5C00`} />
            <StatItem icon={HistoryIcon} name="Total Trips" count={data.totalTrip.toString()} colorAccent={'#F3F9FF'} color={`#428BC1`} />
            <StatItem icon={UsersIcon} name="Passengers" count={data.totalUser.toString()} colorAccent={'#FCF3FF'} color={`#9300D9`} />
        </div>
    </div>
}