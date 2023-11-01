import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { cn } from "@/lib/utils"
import { useAddAdmin } from "@/utils/apiHooks/admins/useAddAdmin"
import { isEmail, validateName } from "@/utils/validation/validation"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Button from "../../buttons"
import { Divider } from "../../Divider"
import { InputProps, TextField } from "../../input/InputText"

type AddAdminsModalProps = {

}

type AddAdminsModalDataPayload = {
    onNewAdminAdded?: () => void
}

export type AddAdminsModalRef = {
    open: (paylod?: AddAdminsModalDataPayload) => void,
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

export const AddAdminsModal = forwardRef<AddAdminsModalRef, AddAdminsModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const { showSnackBar } = useContext(GlobalActionContext)
    const onNewAdminAdded = useRef<() => void>()
    const { isLoading, error, data, addAdmin } = useAddAdmin()

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (data) {
            onNewAdminAdded.current?.()
        }
    }, [data])

    function closeModal() {
        setIsVisible(false)
        onNewAdminAdded.current = undefined
    }

    useImperativeHandle(ref, () => ({
        open(payload?: AddAdminsModalDataPayload) {
            onNewAdminAdded.current = payload?.onNewAdminAdded
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

    function submit() {
        if (!validateName(firstName)) {
            showSnackBar({ severity: 'error', message: "Firstname can accept 1-50 characters, English letters, and numbers at this time." })
        } else if (!validateName(lastName)) {
            showSnackBar({ severity: 'error', message: "Lastname can accept 1-50 characters, English letters, and numbers at this time." })
        } else if (!isEmail(email)) {
            showSnackBar({ severity: 'error', message: "Invalid Email Address" })
        } else if (phoneNumber.length < 11 || isNaN(parseInt(phoneNumber))) {
            showSnackBar({ severity: 'error', message: "Invalid Phone number" })
        } else {
            addAdmin({
                email,
                lastName,
                firstName,
                phoneNumber,
                roleId: ''
            })
        }
    }

    function onLastNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
    }

    function onFirstNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
    }

    function onEmailChanged(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function onPhoneNumberChanged(event: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(event.target.value)
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Add Admin</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">First Name*</h4>
                    <AdminInputField onChange={onFirstNameChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Last Name*</h4>
                    <AdminInputField onChange={onLastNameChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Email*</h4>
                    <AdminInputField onChange={onEmailChanged} />
                </div>

                <Divider />

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Phone Number*</h4>
                    <AdminInputField onChange={onPhoneNumberChanged} type="number" />
                </div>

                <div className="flex gap-8">
                    <Button disabled={isLoading} onClick={closeModal} variant="outlined" className="flex-1 py-3">Close</Button>

                    <Button isLoading={isLoading} disabled={isLoading} onClick={submit} variant="contained" className="flex-1 py-3">Next</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

AddAdminsModal.displayName = "AddAdminsModal"