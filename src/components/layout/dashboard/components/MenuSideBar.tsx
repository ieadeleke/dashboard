import LogoIcon from '@/assets/icons/ic_logo.svg'
import HomeIcon from '@/assets/icons/ic_home.svg'
import FleetIcon from '@/assets/icons/ic_fleet.svg'
import StaffIcon from '@/assets/icons/ic_staff.svg'
import HistoryIcon from '@/assets/icons/ic_history.svg'
import PassengersIcon from '@/assets/icons/ic_passengers.svg'
import MessagesIcon from '@/assets/icons/ic_info.svg'
import LogOutIcon from '@/assets/icons/ic_logout.svg'
import { ListItem } from './ListItem'
import Link from 'next/link'
import { Divider } from '@/components/Divider'


export const MenuSideBar = () => {
    

    return (
        <div className="w-full flex flex-col gap-8 items-center bg-white rounded-3xl px-2 py-3 lg:items-start">
            <Link className="mx-auto" href="/home" passHref>

                <LogoIcon />

            </Link>

            <div className="flex flex-col gap-5 mt-4 lg:w-full">
                <ListItem isActive startIcon={<HomeIcon />} name="Home" href="/" />
                <ListItem startIcon={<FleetIcon />} name="Fleets" href="/fleets" />
                <ListItem startIcon={<StaffIcon />} name="Staff" href="/staff" />
                <ListItem startIcon={<HistoryIcon />} name="Trip History" href="/trip-history" />
                <ListItem startIcon={<PassengersIcon />} name="Passengers" href="/passengers" />
                <Divider />
                <ListItem startIcon={<MessagesIcon />} name="Messages" href="/messages" />
                <ListItem startIcon={<LogOutIcon />} name="Log Out" href="/log-out" />
                
            </div>
        </div>
    );
}