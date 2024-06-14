import { Divider } from "@/components/Divider"
import Button from "@/components/buttons"
import { IconButton } from "@/components/buttons/IconButton"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Admin } from "@/models/profile"
import { XIcon } from "lucide-react"
import { forwardRef, useImperativeHandle, useState } from "react"
import { AdminAvatar } from "../image/AdminAvatar"

type AdminInfoDataPayload = {
    data: Admin
}

export type AdminInfoRef = {
    open: (data: AdminInfoDataPayload) => void,
    close: () => void
}

type AdminInfoProps = {

}

export const AdminInfo = forwardRef<AdminInfoRef, AdminInfoProps>((props, ref) => {
    const [admin, setAdmin] = useState<Admin>()
    const [isOppen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open(data) {
            setAdmin(data.data)
            setIsOpen(true)
        },
        close() {
            handleClose()
        },
    }))

    function handleClose() {
        setIsOpen(false)
        setAdmin(undefined)
    }

    function onOpenChanged(value: boolean) {
        if (!value) {
            handleClose()
        }
    }

    return <Dialog open={isOppen} onOpenChange={onOpenChanged}>
        {admin && <DialogContent className="min-w-[600px] max-h-[90vh] overflow-y-scroll">
            <DialogHeader className="flex flex-row items-center">
                <h1>Admin</h1>
                <div className="flex-1" />
                <IconButton onClick={handleClose}>
                    <XIcon className="text-gray-500" />
                </IconButton>
            </DialogHeader>

            <Divider />

            <div className="flex flex-col items-center text-center gap-4">
                <AdminAvatar className="h-16 w-16 rounded-lg" name={admin.firstName} />

                <h1 className="font-semibold text-3xl">{`${admin.firstName} ${admin.lastName}`}</h1>
                <p className="text-gray-500">{admin.phoneNumber}</p>
                <div className="bg-gray-300 px-6 py-3 rounded-sm">
                    <p className="font-medium">{admin.superAdmin ? "Super Admin" : admin.role ? admin.role.roleName : ''}</p>
                </div>
                <p className="text-gray-500">admin@gmail.com</p>

                {/* <p className="text-gray-500">Figma ipsum component variant main layer. Asset flatten bullet scale layer. Object layer layer connection layer underline share style inspect. Prototype pencil bold horizontal rotate reesizing pixel image flatten. Arrow fill inspect align figma. Hand font distribute move underline line rectangle ellipse. Layout boolean flows frame thumbnail. Layout.</p> */}
            </div>

            <div>
                <p className="text-center font-semibold">Permissions List</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 justify-center mt-4">
                    {admin.privileges.map((privilege, index) => <div key={index} className="bg-gray-200 px-4 py-2 rounded-lg">
                        <p className="text-gray-700">{privilege}</p>
                    </div>)}
                </div>
            </div>

            <Button onClick={handleClose} className="bg-primary w-48 rounded-lg mt-4 mx-auto">Close</Button>
        </DialogContent>}
    </Dialog>
})

AdminInfo.displayName = "AdminInfo"