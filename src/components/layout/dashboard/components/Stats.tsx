import ShipLine from '@/assets/icons/ic_ship_line.svg'
import UsersIcon from '@/assets/icons/ic_users_line.svg'
import CautionIcon from '@/assets/icons/ic_caution.svg'
import HistoryIcon from '@/assets/icons/ic_history.svg'
import { StatItem } from "@/components/layout/dashboard/components/StatItem";
import Button from "@/components/buttons";

const stats = [
    {
        name: "Boats",
        count: "143k",
        color: "#00BD09",
        accentColor: '#EAFFE1',
        icon: ShipLine
    },
    {
        name: "Incidents",
        count: "500",
        color: "#FF5C00",
        accentColor: '#FFFBED',
        icon: CautionIcon
    },
    {
        name: "Total Trips",
        count: "99K",
        color: "#428BC1",
        accentColor: '#F3F9FF',
        icon: HistoryIcon
    },
    {
        name: "Passengers",
        count: "17,532",
        color: "#9300D9",
        accentColor: '#FCF3FF',
        icon: UsersIcon
    }
]


export const Stats = () => {
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
            {stats.map((item) => <StatItem key={item.name} icon={item.icon} name={item.name} color={item.color} count={item.count} colorAccent={item.accentColor} />)}
        </div>
    </div>
}