import LogoIcon from '@/assets/icons/ic_logo.svg'
import HomeIcon from '@/assets/icons/ic_home.svg'
import FleetIcon from '@/assets/icons/ic_fleet.svg'
import StaffIcon from '@/assets/icons/ic_staff.svg'
import HistoryIcon from '@/assets/icons/ic_history.svg'
import TrackingIcon from '@/assets/icons/ic_tracking.svg'
import PassengersIcon from '@/assets/icons/ic_passengers.svg'
import MessagesIcon from '@/assets/icons/ic_info.svg'
import LogOutIcon from '@/assets/icons/ic_logout.svg'
import { ListItem } from './ListItem'
import Link from 'next/link'
import { Divider } from '@/components/Divider'
import { TimerIcon } from 'lucide-react'
import { ConfirmationAlertDialog, ConfirmationAlertDialogRef } from '@/components/dialogs/ConfirmationAlertDialog'
import { useRef } from 'react'
import { logOut } from '@/utils/auth/logout'


export const MenuSideBar = () => {
    const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null)

    function handleLogout() {
        confirmationDialogRef.current?.show({
            data: {
                title: "Are you sure you want to logout?",
                description: "Your active session will be removed from this device"
            },
            onCancel: () => {
                confirmationDialogRef.current?.dismiss()
            },
            onConfirm: () => {
                confirmationDialogRef.current?.dismiss()
                logOut()
                location.href="/"
            }
        })
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 items-center bg-white rounded-3xl overflow-y-scroll no-scrollbar px-0 py-3 lg:px-2 lg:items-start">
            <ConfirmationAlertDialog ref={confirmationDialogRef} />
            <Link className="mx-auto" href="/home" passHref>

                <LogoIcon />

            </Link>

            <div className="flex flex-col gap-5 mt-4 lg:w-full">
                <ListItem isActive startIcon={<HomeIcon />} name="Home" href="/" />
                <ListItem startIcon={<FleetIcon />} name="Fleets" href="/fleets" />
                <ListItem startIcon={<StaffIcon />} name="Operators" href="/operators" />
                <ListItem startIcon={<HistoryIcon />} name="Trip History" href="/trip-history" />
                <ListItem startIcon={<TimerIcon />} name="Activities" href="/activities" />
                <ListItem startIcon={<PassengersIcon />} name="Incidents" href="/incidents" />
                <ListItem startIcon={<TrackingIcon />} name="Tracking" href="/tracking" />
                <Divider />
                <ListItem startIcon={<MessagesIcon />} name="Admins" href="/admins" />
                <div
                    onClick={handleLogout}
                    className={`flex cursor-pointer rounded-md items-center gap-4 px-3 py-3 hover:bg-primary-20`}>

                    <LogOutIcon />
                    <p className={`hidden text-sm lg:block`}>Log Out</p>

                </div>
            </div>
        </div>
    );
}