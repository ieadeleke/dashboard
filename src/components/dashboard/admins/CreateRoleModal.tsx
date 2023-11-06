import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { cn } from "@/lib/utils"
import { useCreateRole } from "@/utils/apiHooks/roles/useCreateRole"
import { useFetchPrivileges } from "@/utils/apiHooks/roles/useFetchPrivileges"
import { ChangeEvent, useEffect } from "react"
import { useContext } from "react"
import { forwardRef, useImperativeHandle, useState } from "react"
import Button from "../../buttons"
import { CheckBox } from "../../buttons/CheckBox"
import { Divider } from "../../Divider"
import { InputProps, TextField } from "../../input/InputText"

type CreateRoleModalProps = {

}

export type CreateRoleModalRef = {
    open: () => void,
    close: () => void
}

const CreateRoleInputField = ({ className, ...props }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    function onBlur() {
        setIsFocused(false)
    }

    function onFocus() {
        setIsFocused(true)
    }

    return <TextField.Container className={cn(`border ${isFocused ? 'border-[#6BC3FF]' : 'border-gray-100'}`)}>
        <TextField.Input onBlur={onBlur} onFocus={onFocus} {...props} />
    </TextField.Container>
}

export const CreateRoleModal = forwardRef<CreateRoleModalRef, CreateRoleModalProps>((_, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const { isLoading, error, createRole, data } = useCreateRole()
    const { isLoading: isFetchLoading, error: fetchError, fetchPrivileges, data: privileges } = useFetchPrivileges()
    const { showSnackBar } = useContext(GlobalActionContext)
    const [roleName, setRoleName] = useState('')
    const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([])

    function closeModal() {
        setIsVisible(false)
        setRoleName('')
        setSelectedPrivileges([])
    }

    useEffect(() => {
        if (isVisible) {
            fetchPrivileges()
        }
    }, [isVisible])

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (data) {
            showSnackBar({ severity: 'success', message: "Role created successfully" })
            closeModal()
        }
    }, [data])

    useImperativeHandle(ref, () => ({
        open() {
            setIsVisible(true)
        },
        close() {
            closeModal()
        }
    }))

    function onOpenChange(value: boolean) {
        if (!value) {
            closeModal()
        }
    }

    function onRoleNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setRoleName(event.target.value)
    }

    function submit() {
        if (roleName.trim().length < 1) {
            return showSnackBar({ severity: 'error', message: "Role name should contain one or more characters" })
        } else if (selectedPrivileges.length == 0) {
            return showSnackBar({ severity: 'error', message: "Please select at least one privilege for this role" })
        }
        createRole({ roleName, roles: selectedPrivileges })
    }

    function onPrivilegeSelected(id: string) {
        setSelectedPrivileges((privileges) => privileges.filter((item) => item != id).concat(id))
    }

    function onPrivilegeRemoved(id: string) {
        setSelectedPrivileges((privileges) => privileges.filter((item) => item != id))
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Create Role</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Role Name*</h4>
                    <CreateRoleInputField onChange={onRoleNameChanged} placeholder="e.g Editor" />
                </div>

                {/* <div className="flex justify-center items-center h-10 bg-primary text-white">
                    <h1 className="text-center">Permisson</h1>
                </div> */}

                <NetworkRequestContainer isLoading={isFetchLoading} error={fetchError} onRetry={fetchPrivileges}>
                    <div className="flex flex-col gap-2">
                        {privileges.map((item, index) => {

                            function onPrivilegeValueChanged(value: boolean) {
                                if (value) {
                                    onPrivilegeSelected(item)
                                } else onPrivilegeRemoved(item)
                            }

                            return <div className="flex items-center gap-2" key={index}>
                                <CheckBox isChecked={!!selectedPrivileges.find((privilege) => privilege == item)} onValueChange={onPrivilegeValueChanged} />
                                <p className="text-sm font-medium">{item}</p>
                            </div>
                        })}
                    </div>
                </NetworkRequestContainer>

                <div className="flex gap-8">
                    <Button onClick={closeModal} disabled={isLoading || isFetchLoading} variant="outlined" className="flex-1 py-2 border-none bg-[#F1F1F1]">Cancel</Button>

                    <Button onClick={submit} disabled={isLoading || isFetchLoading} variant="contained" className="flex-1 py-2">Save</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

CreateRoleModal.displayName = "CreateRoleModal"