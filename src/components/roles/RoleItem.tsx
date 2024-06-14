import { MoreVerticalIcon, PencilIcon } from "lucide-react"
import RoleIcon from '@/assets/icons/ic_role.svg'
import { IconButton } from "@/components/buttons/IconButton"
import { Role } from "@/models/profile"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type RoleItemProps = {
    data: Role,
    onEditRole?: (role: Role) => void
}

export const RoleItem = (props: RoleItemProps) => {
    const { data } = props

    return <div className="px-4 py-4 bg-gray-100 rounded-md">
        <div className="flex flex-col items-center gap-3">
            <Popover>
                <PopoverTrigger className="flex flex-col self-end bg-transparent border-none p-0">
                    <IconButton className="self-end p-0">
                        <MoreVerticalIcon className="text-gray-500" />
                    </IconButton>
                </PopoverTrigger>

                <PopoverContent className="max-w-[200px] p-0">
                    <div onClick={() => props.onEditRole?.(data)} className="flex items-center gap-2 px-2 py-2 cursor-pointer text-gray-700  hover:bg-gray-100">
                        <PencilIcon className="w-4 h-4" />
                        <p>Update Role</p>
                    </div>
                </PopoverContent>
            </Popover>
            <RoleIcon className="h-12 w-12" />
            <div className="flex flex-col text-center">
                <h1 className="font-semibold">{data.roleName}</h1>
                <p className="text-gray-500">{data.roles.length} permissions</p>
            </div>
        </div>
    </div>
}