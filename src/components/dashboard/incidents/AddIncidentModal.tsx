import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { cn } from "@/lib/utils"
import { Fleet } from "@/models/fleets"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react"
import Button from "../../buttons"
import { InputProps, TextField } from "../../input/InputText"

type AddIncidentModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

export type AddIncidentModalRef = {
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

export const AddIncidentModal = forwardRef<AddIncidentModalRef, AddIncidentModalProps>((props, ref) => {
    const [incidentName, setIncidentName] = useState('')
    const [incidentType, setIncidentType] = useState('')
    const [note, setNote] = useState('')
    const { showSnackBar } = useContext(GlobalActionContext)
    const [isVisible, setIsVisible] = useState(false)


    function closeModal() {
        setIsVisible(false)
    }

    function onIncidentNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setIncidentName(event.target.value)
    }

    function onIncidentTypeChanged(event: ChangeEvent<HTMLInputElement>) {
        setIncidentType(event.target.value)
    }

    function onNoteChanged(event: ChangeEvent<HTMLInputElement>) {
        setNote(event.target.value)
    }

    function submit() {

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

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Add Incident</h2>
            </div>

            <div className="flex flex-col gap-6">

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Incident Name</h4>
                    <AdminInputField onChange={onIncidentNameChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Incident Type</h4>
                    <AdminInputField onChange={onIncidentTypeChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Note</h4>
                    <AdminInputField onChange={onNoteChanged} />
                </div>

                <div className="flex gap-8">
                    <Button onClick={closeModal} variant="outlined" className="flex-1 py-3">Close</Button>

                    <Button onClick={submit} variant="contained" className="flex-1 py-3">Next</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

AddIncidentModal.displayName = "AddIncidentModal"