import { DEFAULT_PROFILE_URL } from "@/utils/constants/strings"
import PhoneIcon from '@/assets/icons/ic_phone.svg'
import MailIcon from '@/assets/icons/ic_mail.svg'
import CautionIcon from '@/assets/icons/ic_caution.svg'
import LockAccessIcon from '@/assets/icons/ic_lock_access.svg'
import { IconButton } from "../buttons/IconButton"
import { MoreVertical } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


type AdminItemProps = {
    name: string,
    department: string,
    phonenumber: string
}

export const AdminItem = () => {
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
            <img className="w-28 h-28 self-center rounded-2xl" src={DEFAULT_PROFILE_URL} />
            <h1 className="font-bold text-primary">Gandalf Hoos</h1>
            <p className="text-gray-400">Department</p>
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className="p-1 bg-primary-100 rounded-xl text-primary">
                    <PhoneIcon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-xs text-[#3F3F3F]">(+234) 514-5666</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-xl text-primary">
                    <MailIcon className="w-4 h-4" />
                </div>
                <p className="flex-1 font-semibold text-xs text-[#3F3F3F]">Joelle_Heidenreich@laswa</p>
            </div>
        </div>

    </div>
}