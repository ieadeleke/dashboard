import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useImperativeHandle, useState } from "react"
import { StatusChip } from "@/components/chips/StatusChip"

type TripDetailModalProps = {

}

export type TripDetailModalRef = {
    open: () => void,
    close: () => void
}

export const TripDetailModal = forwardRef<TripDetailModalRef, TripDetailModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    function closeModal() {
        setIsVisible(false)
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
        <DialogContent>
            <div className="flex flex-col gap-8">
                <h2 className="font-bold text-2xl text-center">Trip Details</h2>

                <div className="flex flex-col gap-6">

                    <div className="flex items-center">
                        <p className="font-bold">Ship ID</p>
                        <div className="flex-1" />

                        <StatusChip.Container>
                            <StatusChip.Label>Active</StatusChip.Label>
                        </StatusChip.Container>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})