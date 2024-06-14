import { Divider } from "@/components/Divider"
import Button from "@/components/buttons"
import { IconButton } from "@/components/buttons/IconButton"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
import { forwardRef, useImperativeHandle, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { Avatar } from "../image/Avatar"

export type AssignRoleRef = {
    open?: () => void,
    close?: () => void
}

type AssignRoleProps = {

}

export const AssignRole = forwardRef<AssignRoleRef, AssignRoleProps>((props, ref) => {
    const [isOppen, setIsOpen] = useState(false)
    const [permissions, setPermissions] = useState(["My role", "Your role", "Their role"])
    const [selectedRole, setSelectedRole] = useState<string>()

    useImperativeHandle(ref, () => ({
        open() {
            setIsOpen(isOppen)
        },
        close() {
            handleClose()
        },
    }))

    function handleClose() {
        setIsOpen(false)
    }

    function onOpenChanged(value: boolean) {
        if (!value) {
            handleClose()
        }
    }

    function updateSelectedPermissions(role: string) {
        setSelectedRole(role)
    }

    return <Dialog open={isOppen} onOpenChange={onOpenChanged}>
        <DialogContent className="min-w-[600px] max-h-[90vh] overflow-y-scroll">
            <DialogHeader className="flex flex-row items-center">
                <h1>Assign Role</h1>
                <div className="flex-1" />
                <IconButton>
                    <XIcon className="text-gray-500" />
                </IconButton>
            </DialogHeader>

            <Divider />

            <div className="flex flex-col bg-[#F9F9F9] px-4 py-4 gap-8">
                <div className="flex flex-col gap-2">
                    <div className="h-16 bg-[#0093DD] rounded-t-sm" />
                    <div className="flex flex-col gap-4 self-center text-center items-center -mt-10">
                        <Avatar className="bg-gray-500 h-16 w-16 rounded-lg" />
                        <h1 className="font-semibold text-2xl">Maxine Runte</h1>

                        <div className="flex flex-col gap-1">
                            <p>+234 805 6789</p>
                            <p>myemail@gmail.com</p>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-light">Choose Role</p>
                    <Select onValueChange={updateSelectedPermissions}>
                        <SelectTrigger className="outline-none border-none text-gray-500 text-sm">
                            <p>{selectedRole ? selectedRole : "Select Role"}</p>
                        </SelectTrigger>
                        <SelectContent>
                            {permissions.map((permission, index) => <SelectItem key={index} value={permission}>{permission}</SelectItem>)}
                        </SelectContent>
                    </Select>

                </div>
            </div>

            <Button className="bg-primary w-48 rounded-lg mt-4 mx-auto">Save</Button>
        </DialogContent>
    </Dialog>
})

AssignRole.displayName = "AssignRole"