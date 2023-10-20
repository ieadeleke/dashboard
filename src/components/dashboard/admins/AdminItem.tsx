import PhoneIcon from '@/assets/icons/ic_phone.svg'
import MailIcon from '@/assets/icons/ic_mail.svg'
import CautionIcon from '@/assets/icons/ic_caution.svg'
import LockAccessIcon from '@/assets/icons/ic_lock_access.svg'
import { IconButton } from "../../buttons/IconButton"
import { MoreVertical } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useMemo } from "react"
import { Admin } from '@/models/admins'
import { DEFAULT_PROFILE_URL } from '@/utils/constants/strings'


type AdminItemProps = {
    data: Admin
}

export const AdminItem = (props: AdminItemProps) => {
    const { data } = props
    const { personalInfo } = data

    const initials = useMemo(() => {
        const names = `${personalInfo.firstName} ${personalInfo.lastName}`.split(' ')
        return `${names[0].substring(0,1)}${names[1].substring(0,1)}`.toUpperCase()
    }, [personalInfo.firstName, personalInfo.lastName])

    return <div className="relative flex flex-col gap-6 bg-white py-8 px-3 rounded-md">

        <Popover>
            <PopoverTrigger>
                <IconButton className="absolute top-2 right-1 text-gray-400">
                    <MoreVertical />
                </IconButton>
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    <div className="flex items-center gap-4 py-3 px-2 cursor-pointer hover:bg-gray-50">
                        <LockAccessIcon className="text-gray-300 w-6 h-6" />
                        <p className="text-[#444444]">Update Access</p>
                    </div>

                    <div className="flex items-center gap-4 py-3 px-2 text-red-500 cursor-pointer hover:bg-gray-50">
                        <CautionIcon className="w-6 h-6" />
                        <p>Remove Admin</p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>

        <div className="flex flex-col gap-3 text-center">
            <div className="relative w-28 h-28 self-center rounded-2xl">
                <img className="w-full h-full rounded-2xl" src={DEFAULT_PROFILE_URL} />

                <p className="absolute z-10 bg-primary p-1 text-white rounded-md -right-4 bottom-0">{initials}</p>
            </div>
            <h1 className="font-bold text-primary">{personalInfo.firstName}</h1>
            <p className="text-gray-400">{data.superAdmin ? 'Super Admin' : 'Staff'}</p>
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className="p-1 bg-primary-100 rounded-xl text-primary">
                    <PhoneIcon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-xs text-[#3F3F3F]">{personalInfo.phoneNumber}</p>
            </div>

            <div className="flex flex-nowrap items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-xl text-primary">
                    <MailIcon className="w-4 h-4" />
                </div>
                <p className="flex-1 font-semibold text-xs line-clamp-1 text-[#3F3F3F]">{personalInfo.email}</p>
            </div>
        </div>

    </div>
}