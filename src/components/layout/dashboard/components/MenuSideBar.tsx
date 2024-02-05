import DashboardIcon from '@/assets/icons/ic_compass.svg'
import AgentsIcon from '@/assets/icons/ic_agents.svg'
import AgencyIcon from '@/assets/icons/ic_agency.svg'
import TransactionIcon from '@/assets/icons/ic_transactions.svg'
import LogOutIcon from '@/assets/icons/ic_logout.svg'
import MenuIcon from '@/assets/icons/ic_main.svg'
import { ListItem } from './ListItem'
import Link from 'next/link'
import { Divider } from '@/components/Divider'
import { ConfirmationAlertDialog, ConfirmationAlertDialogRef } from '@/components/dialogs/ConfirmationAlertDialog'
import { useRef } from 'react'
import { PhoneIcon } from 'lucide-react'


export const MenuSideBar = () => {
    const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null)

    return (
        <div className="w-full h-full flex flex-col gap-8 items-center bg-white overflow-y-scroll no-scrollbar px-0 py-6 lg:px-2 lg:items-start">
            <ConfirmationAlertDialog ref={confirmationDialogRef} />
            <Link className="mx-auto flex items-center gap-8" href="/dashboard" passHref>

                <MenuIcon className="text-primary" />
                <h1 className='font-bold'>Pay4It</h1>

            </Link>

            <div className="flex flex-col gap-5 mt-4 lg:w-full">
                <ListItem isActive startIcon={<DashboardIcon />} name="Dashboard" href="/" />
                <ListItem startIcon={<AgentsIcon />} name="Agents" href="/agents" />
                <ListItem startIcon={<AgencyIcon />} name="Agency" href="/agency" />
                <ListItem startIcon={<PhoneIcon />} name="POS" href="/pos" />
                <ListItem startIcon={<TransactionIcon />} name="Web Transactions" href="/web-transactions" />
                <ListItem startIcon={<LogOutIcon />} name="Logout" href="/logout" />
                <Divider />
            </div>
        </div>
    );
}
