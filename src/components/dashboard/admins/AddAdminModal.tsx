import { BaseSelect, BaseSelectOption } from "@/components/select/BaseSelect"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { cn } from "@/lib/utils"
import { Admin } from "@/models/admins"
import { useAddAdmin } from "@/utils/apiHooks/admins/useAddAdmin"
import { useUpdateAdminRole } from "@/utils/apiHooks/admins/useUpdateAdminRole"
import { useFetchRoles } from "@/utils/apiHooks/roles/useFetchRoles"
import { isEmail, validateName } from "@/utils/validation/validation"
import { useMemo } from "react"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Button from "../../buttons"
import { Divider } from "../../Divider"
import { InputProps, TextField } from "../../input/InputText"

type AddAdminsModalProps = {

}

type AddAdminsModalDataPayload = {
    data?: Admin,
    onAdminRoleUpdated?: (admin: Admin) => void,
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
    const [admin, setAdmin] = useState<Admin>()
    const { showSnackBar } = useContext(GlobalActionContext)
    const onNewAdminAdded = useRef<() => void>()
    const onAdminRoleUpdated = useRef<(admin: Admin) => void>()
    const [role, setRole] = useState<BaseSelectOption | null>(null)
    const { isLoading: isFetchRolesLoading, error: fetchRoleError, data: roles, fetchRoles } = useFetchRoles()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { isLoading: isAddAdminLoading, error: addAdminError, data: addAdminData, addAdmin } = useAddAdmin()
    const { isLoading: isUpdateRoleLoading, error: updateRoleError, data: updateRoleData, clearUpdatedData, updateAdminRole } = useUpdateAdminRole()

    const isEditMode = useMemo(() => !!admin, [admin])

    const roleOptions: BaseSelectOption[] = useMemo(() => roles.map((item) => ({ id: item._id, label: item.roleName, value: item.roleName })), [JSON.stringify(roles)])

    useEffect(() => {
        if (isVisible) {
            fetchRoles()
        }
    }, [isVisible])

    useEffect(() => {
        setError(addAdminError || updateRoleError)
    }, [updateRoleError, addAdminError])

    useEffect(() => {
        setIsLoading(isAddAdminLoading || isUpdateRoleLoading)
    }, [isAddAdminLoading, isUpdateRoleLoading])

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (addAdminData) {
            onNewAdminAdded.current?.()
        }
    }, [addAdminData])

    useEffect(() => {
        if (updateRoleData && admin) {
            const newData = Object.assign({}, admin, {})
            onAdminRoleUpdated.current?.(newData)
            clearUpdatedData()
        }
    }, [updateRoleData, admin])

    function closeModal() {
        setIsVisible(false)
        setAdmin(undefined)
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setRole(null)
        onAdminRoleUpdated.current = undefined
        onNewAdminAdded.current = undefined
    }

    useEffect(() => {
        if (admin) {
            setFirstName(admin.personalInfo.firstName)
            setLastName(admin.personalInfo.lastName)
            setEmail(admin.personalInfo.email)
            setPhoneNumber(admin.personalInfo.phoneNumber)
        }
    }, [admin])

    //hack to retrive the actual role from db since api response only returns the role id
    useEffect(() => {
        if (admin) {
            const selectedRole = roles.find((item) => item._id == admin.roleId)
            if (selectedRole) {
                setRole({ id: selectedRole._id, label: selectedRole.roleName, value: selectedRole.roleName })
            }
        }
    }, [admin])

    useImperativeHandle(ref, () => ({
        open(payload?: AddAdminsModalDataPayload) {
            setAdmin(payload?.data)
            onNewAdminAdded.current = payload?.onNewAdminAdded
            onAdminRoleUpdated.current = payload?.onAdminRoleUpdated
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
            if (!isEditMode) {
                addAdmin({
                    email,
                    lastName,
                    firstName,
                    phoneNumber,
                    roleId: role?.id ?? null
                })
            } else {
                if (admin && role) {
                    if (!role) {
                        return showSnackBar({ severity: 'error', message: "You need to select a role" })
                    }
                    updateAdminRole({ userId: admin._id, roleId: role.id })
                }
            }
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

    function onRoleSelected(option: BaseSelectOption) {
        setRole(option)
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">{isEditMode ? "Update Admin" : "Add Admin"}</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">First Name*</h4>
                    <AdminInputField value={firstName} defaultValue={firstName} disabled={isEditMode} onChange={onFirstNameChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Last Name*</h4>
                    <AdminInputField value={lastName} defaultValue={lastName} disabled={isEditMode} onChange={onLastNameChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Email*</h4>
                    <AdminInputField defaultValue={email} value={email} disabled={isEditMode} onChange={onEmailChanged} />
                </div>

                <Divider />

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Phone Number*</h4>
                    <AdminInputField defaultValue={phoneNumber} value={phoneNumber} disabled={isEditMode} onChange={onPhoneNumberChanged} type="number" />

                    <h4 className="text-sm font-medium">Role*</h4>
                    <BaseSelect
                        isLoading={isFetchRolesLoading}
                        value={role}
                        placeholder="Search for roles"
                        onChange={onRoleSelected}
                        options={roleOptions}
                    // formatOptionLabel={(option) => {
                    //     const fleet = roleOptions.find((item) => item._id == option.id)
                    //     return <div>
                    //         <div className="flex items-center gap-4">
                    //             <p>{fleet?.model}</p>
                    //         </div>
                    //     </div>
                    // }}
                    />
                    {/* <AdminInputField disabled={isEditMode} onChange={onRoleChanged} /> */}
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