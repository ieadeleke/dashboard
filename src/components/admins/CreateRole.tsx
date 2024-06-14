import { Divider } from "@/components/Divider"
import Button from "@/components/buttons"
import { IconButton } from "@/components/buttons/IconButton"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react"
import { TextField } from "../input/InputText"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { useGetPrivileges } from "@/utils/apiHooks/admin/useGetPrivileges"
import NetworkStateComponent from "../network/NetworkStateComponent"
import { useCreateRole } from "@/utils/apiHooks/admin/useCreateRole"
import { Role } from "@/models/profile"
import { useUpdateRole } from "@/utils/apiHooks/admin/useUpdateRole"
import { GlobalActionContext } from "@/context/GlobalActionContext"

type CreateRoleData = {
    data?: Role
}

export type CreateRoleRef = {
    open: (data?: CreateRoleData) => void,
    close: () => void
}

type CreateRoleProps = {
    onNewRoleCreated?: (role: Role) => void,
    onRoleUpdated?: (role: Role) => void
}

export const CreateRole = forwardRef<CreateRoleRef, CreateRoleProps>((props, ref) => {
    const [isOppen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const { isLoading: isFetchLoading, error: fetchError, getPrivileges, data: permissions } = useGetPrivileges()
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
    const [role, setRole] = useState<Role>()
    const { isLoading: isCreateLoading, error: createError, createRole, data: createdRole } = useCreateRole()
    const { isLoading: isUpdateLoading, error: updateError, updateRole, data: updatedRole } = useUpdateRole()
    const { showSnackBar } = useContext(GlobalActionContext)

    const isUpdate = useMemo(() => !!role, [role])

    useImperativeHandle(ref, () => ({
        open(data) {
            if (data?.data) {
                setRole(data.data)
            }
            setIsOpen(true)
        },
        close() {
            handleClose()
        },
    }))

    useEffect(() => {
        if (isOppen) {
            getPrivileges()
        }
    }, [isOppen])

    useEffect(() => {
        if (role) {
            setName(role.roleName)
            setSelectedPermissions(role.roles)
        }
    }, [role])

    useEffect(() => {
        if (createdRole) {
            props.onNewRoleCreated?.(createdRole)
            showSnackBar({
                severity: 'success',
                message: "Role created successfully"
            })
            setTimeout(handleClose, 1000)
        }
    }, [createdRole])

    useEffect(() => {
        if (updatedRole) {
            props.onRoleUpdated?.(updatedRole)
            showSnackBar({
                severity: 'success',
                message: "Role updated successfully"
            })
            setTimeout(handleClose, 1000)
        }
    }, [updatedRole])

    useEffect(() => {
        if (createError) {
            showSnackBar({
                severity: 'error',
                message: createError
            })
        }
    }, [createError])

    useEffect(() => {
        if (updateError) {
            showSnackBar({
                severity: 'error',
                message: updateError
            })
        }
    }, [updateError])

    function handleClose() {
        setName('')
        setSelectedPermissions([])
        setIsOpen(false)
    }

    function onOpenChanged(value: boolean) {
        if (!value) {
            handleClose()
        }
    }

    function updateSelectedPermissions(permission: string) {
        if (!selectedPermissions?.find((item) => item === permission)) {
            setSelectedPermissions((permissions) => [...permissions, permission])
        }
    }

    function removePermission(permission: string) {
        setSelectedPermissions((permissions) => permissions?.filter((item) => item != permission))
    }

    function onNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function save() {
        if (name.trim().length <= 0) {
            return showSnackBar({
                severity: 'error',
                message: "Name cannot be empty"
            })
        } else if (selectedPermissions.length <= 0) {
            return showSnackBar({
                severity: 'error',
                message: "Permissions can't be empty"
            })
        }
        if (isUpdate) {
            return updateRole({
                roleId: role!!._id,
                roleName: name,
                roles: selectedPermissions
            })
        }
        createRole({
            roleName: name,
            roles: selectedPermissions
        })
    }

    return <Dialog open={isOppen} onOpenChange={onOpenChanged}>
        <DialogContent className="max-w-[98vw] max-h-[90vh] overflow-y-scroll md:min-w-[600px] md:max-w-[600px]">
            <DialogHeader className="flex flex-row items-center">
                <h1>{isUpdate ? "Update Role" : "Create Role"}</h1>
                <div className="flex-1" />
                <IconButton onClick={handleClose}>
                    <XIcon className="text-gray-500" />
                </IconButton>
            </DialogHeader>

            <Divider />

            <div className="flex flex-col bg-[#F9F9F9] px-4 py-4 gap-8">
                <div className="flex flex-col gap-2">
                    <p className="font-light">Role Name</p>
                    <TextField.Input value={name} onChange={onNameChanged} className="bg-white px-2 rounded-md text-sm" placeholder="Give me role a name" />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-light">Choose Permission</p>
                    <Select value={""} onValueChange={updateSelectedPermissions}>
                        <SelectTrigger className="outline-none border-none text-gray-500 text-sm">
                            <p>Select Permission</p>
                        </SelectTrigger>
                        <SelectContent>
                            <NetworkStateComponent fetchMore={getPrivileges} isLoading={isFetchLoading} error={fetchError}>
                                {permissions.map((permission, index) => <SelectItem key={index} value={permission}>{permission}</SelectItem>)}
                            </NetworkStateComponent>
                        </SelectContent>
                    </Select>

                </div>
            </div>

            <div>
                <p className="text-center font-semibold">Permissions List</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 justify-center mt-4">
                    {selectedPermissions.map((item, index) => <div key={index} className="flex items-center bg-[#0093DD] px-4 py-2 rounded-lg gap-4">
                        <p className="text-white">{item}</p>
                        <IconButton onClick={() => removePermission(item)} className="bg-white p-1">
                            <XIcon className="w-4 h-4 text-[#0093DD]" />
                        </IconButton>
                    </div>)}
                </div>
            </div>

            <Button isLoading={isCreateLoading || isUpdateLoading} disabled={isCreateLoading || isUpdateLoading} onClick={save} className="bg-primary w-48 rounded-lg mt-4 mx-auto">Save</Button>
        </DialogContent>
    </Dialog>
})

CreateRole.displayName = "CreateRole"