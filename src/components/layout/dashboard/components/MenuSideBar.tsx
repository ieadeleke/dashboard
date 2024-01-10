import DashboardIcon from '@/assets/icons/ic_compass.svg'
import SendIcon from '@/assets/icons/ic_send_message.svg'
import TrackingIcon from '@/assets/icons/ic_tracking.svg'
import WalletIcon from '@/assets/icons/ic_wallet.svg'
import CalculatorIcon from '@/assets/icons/ic_calculator.svg'
import MenuIcon from '@/assets/icons/ic_main.svg'
import { ListItem } from './ListItem'
import Link from 'next/link'
import { Divider } from '@/components/Divider'
import { ConfirmationAlertDialog, ConfirmationAlertDialogRef } from '@/components/dialogs/ConfirmationAlertDialog'
import { useRef } from 'react'


export const MenuSideBar = () => {
    const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null)

    return (
        <div className="w-full h-full flex flex-col gap-8 items-center bg-white overflow-y-scroll no-scrollbar px-0 py-6 lg:px-2 lg:items-start">
            <ConfirmationAlertDialog ref={confirmationDialogRef} />
            <Link className="mx-auto flex items-center gap-8" href="/home" passHref>

                <MenuIcon className="text-primary" />
                <h1 className='font-bold'>EKOMILE</h1>

            </Link>

            <div className="flex flex-col gap-5 mt-4 lg:w-full">
                <ListItem isActive startIcon={<DashboardIcon />} name="Dashboard" href="/dashboard" />
                <ListItem startIcon={<SendIcon />} name="Send Package" href="/dashboard/send-package" />
                <ListItem startIcon={<TrackingIcon />} name="Track Package" href="/dashboard/track-package" />
                <ListItem startIcon={<WalletIcon />} name="Fund Wallet" href="/dashboard/fund-wallet" />
                <ListItem startIcon={<CalculatorIcon />} name="Calculator" href="/dashboard/calculator" />
                <Divider />
            </div>
        </div>
    );
}
