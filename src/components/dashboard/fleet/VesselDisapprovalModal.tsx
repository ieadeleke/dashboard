import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useImperativeHandle, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChevronDown } from "lucide-react"
import Button from "@/components/buttons"
import { ConfirmationAlertDialog, ConfirmationAlertDialogRef } from "@/components/dialogs/ConfirmationAlertDialog"
import { useRef } from "react"

type VesselDisapprovalModalProps = {

}

export type VesselDisapprovalModalRef = {
    open: () => void,
    close: () => void
}

export const VesselDisapprovalModal = forwardRef<VesselDisapprovalModalRef, VesselDisapprovalModalProps>((_, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [reason, setReason] = useState<string>()
    const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null)

    useImperativeHandle(ref, () => ({
        open() {
            setIsVisible(true)
        },
        close() {
            closeModal()
        }
    }))

    function handleDisapproveVessel() {
        if (!reason) {
            alert("Select a reason")
        }
        confirmationDialogRef.current?.show({
            data: {
                title: "Are you sure you want to confirm",
                description: "This action can’t be undone"
            },
            onConfirm: () => {

            },
            onCancel: () => {
                confirmationDialogRef.current?.dismiss()
            }
        })
    }

    function onOpenChange(value: boolean) {
        if (!value) {
            closeModal()
        }
    }

    function closeModal() {
        setIsVisible(false)
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <ConfirmationAlertDialog ref={confirmationDialogRef} />
            <div className="flex flex-col gap-4">
                <h2 className="font-medium text-2xl text-center">Please give reason(s) for Disapproval</h2>

                <Select onValueChange={setReason}>
                    <SelectTrigger className="py-6 bg-white">
                        <p className="text-gray-500">{reason ?? "Select Reasons"}</p>
                        <ChevronDown className="text-gray-500" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex gap-4 items-center mt-4">
                    <Button onClick={closeModal} variant="outlined" className="flex-1 rounded-lg bg-transparent border border-red-500 text-red-500">Back</Button>
                    <Button onClick={handleDisapproveVessel} variant="contained" className="flex-1 rounded-lg bg-red-500">Done</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

VesselDisapprovalModal.displayName = "VesselDisapprovalModal"