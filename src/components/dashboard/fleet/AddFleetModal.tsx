import { Avatar } from "@/components/image/Avatar"
import { BaseSelect, BaseSelectOption } from "@/components/select/BaseSelect"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { cn } from "@/lib/utils"
import { Fleet } from "@/models/fleets"
import { useAddFleet } from "@/utils/apiHooks/fleets/useAddFleet"
import { useGetAllUsers } from "@/utils/apiHooks/users/useGetAllUsers"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react"
import Button from "../../buttons"
import { InputProps, TextField } from "../../input/InputText"

type AddFleetModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

export type AddFleetModalRef = {
    open: () => void,
    close: () => void
}

const AdminInputField = ({ className, ...props }: InputProps) => {
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

export const AddFleetModal = forwardRef<AddFleetModalRef, AddFleetModalProps>((props, ref) => {
    const [selectedUser, setSelectedUser] = useState<BaseSelectOption | null>(null)
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [boatName, setBoatName] = useState('')
    const { showSnackBar } = useContext(GlobalActionContext)
    const { isLoading, error, data, addFleet } = useAddFleet()
    const { isLoading: isUsersLoading, fetchAllUsers, data: users } = useGetAllUsers()
    const [isVisible, setIsVisible] = useState(false)

    const userOptions: BaseSelectOption[] = useMemo(() => users.map((item) => ({ id: item._id, label: item.firstName, value: item.firstName })), [JSON.stringify(users)])

    useEffect(() => {
        fetchAllUsers()
    }, [isVisible])

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (data) {
            showSnackBar({ severity: 'success', message: "New Fleet Added" })
            props.onNewFleetAdded?.(data)
        }
    }, [data])

    function closeModal() {
        setIsVisible(false)
    }

    function onRegistrationNumberChanged(event: ChangeEvent<HTMLInputElement>) {
        setRegistrationNumber(event.target.value)
    }

    function onBoatNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setBoatName(event.target.value)
    }

    function submit() {
        if (selectedUser) {
            addFleet({
                model: boatName,
                regNumber: registrationNumber,
                userId: selectedUser.id
            })
        }
    }

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

    function onUserSelected(option: BaseSelectOption) {
        setSelectedUser(option)
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Add Fleet</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Select User</h4>
                    <BaseSelect
                        isLoading={isUsersLoading}
                        value={selectedUser}
                        placeholder="Search for user"
                        onChange={onUserSelected}
                        options={userOptions}
                        formatOptionLabel={(option) => {
                            const user = users.find((item) => item._id == option.id)
                            return <div>
                                <div className="flex items-center gap-4">
                                    <Avatar src={user?.image} className="bg-gray-300" />
                                    <p>{user?.firstName}</p>
                                </div>
                            </div>
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Registration Number*</h4>
                    <AdminInputField onChange={onRegistrationNumberChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Model*</h4>
                    <AdminInputField onChange={onBoatNameChanged} />
                </div>

                <div className="flex gap-8">
                    <Button onClick={closeModal} disabled={isLoading} variant="outlined" className="flex-1 py-3">Close</Button>

                    <Button onClick={submit} isLoading={isLoading} disabled={isLoading} variant="contained" className="flex-1 py-3">Next</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

AddFleetModal.displayName = "AddFleetModal"