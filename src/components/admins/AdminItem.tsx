import { MoreHorizontal } from "lucide-react"
import { IconButton } from "../buttons/IconButton"
import { Admin } from "@/models/profile"
import { AdminAvatar } from "../image/AdminAvatar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Divider } from "../Divider";

type AdminItemProps = {
    data: Admin,
    viewAdmin?: (admin: Admin) => void,
    suspendAdmin?: (admin: Admin) => void,
    unSuspendAdmin?: (admin: Admin) => void,
}

export const AdminItem = (props: AdminItemProps) => {
    const { data } = props

    return <div className="px-4 py-8 bg-gray-100 rounded-md">
        <div className="flex items-start gap-3">
            <AdminAvatar name={data.firstName} />
            <div className="flex flex-col">
                <h1 className="font-semibold">{`${data.firstName} ${data.lastName}`}</h1>
                <p className="text-gray-500">{data.phoneNumber}</p>
            </div>

            <div className="flex-1" />
            <Popover>
                <PopoverTrigger className="flex flex-col self-end border-none p-0">
                    <IconButton className="self-start">
                        <MoreHorizontal className="text-gray-500" />
                    </IconButton>
                </PopoverTrigger>

                <PopoverContent className="w-[150px] p-0 bg-gray-200 shadow-sm rounded-lg overflow-hidden">

                    <div onClick={() => props.viewAdmin?.(data)} className="flex items-center gap-2 px-2 py-2 cursor-pointer text-gray-700 hover:bg-primary hover:text-white">
                        <p>View Admin</p>
                    </div>

                    <Divider />

                    {data.isActive ? <div onClick={() => props.suspendAdmin?.(data)} className="flex items-center gap-2 px-2 py-2 bg-red-500 text-white cursor-pointer hover:bg-red-800 hover:text-white">
                        <p>Suspend Admin</p>
                    </div> : <div onClick={() => props.unSuspendAdmin?.(data)} className="flex items-center gap-2 px-2 py-2 text-white bg-red-500 cursor-pointer hover:bg-red-800 hover:text-white">
                        <p>Unsuspend Admin</p>
                    </div>}
                </PopoverContent>
            </Popover>
        </div>
    </div>
}