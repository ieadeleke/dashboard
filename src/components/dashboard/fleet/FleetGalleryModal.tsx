import { IconButton } from "@/components/buttons/IconButton"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { Fleet } from "@/models/fleets"
import { XIcon } from "lucide-react"
import { forwardRef, useContext, useImperativeHandle, useState } from "react"

type FleetGalleryModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

export type FleetGalleryModalRef = {
    open: () => void,
    close: () => void
}

export const FleetGalleryModal = forwardRef<FleetGalleryModalRef, FleetGalleryModalProps>((props, ref) => {

    const { showSnackBar } = useContext(GlobalActionContext)
    const [isVisible, setIsVisible] = useState(true)

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
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <IconButton className="self-end text-gray-500">
                    <XIcon />
                </IconButton>
            </div>

            <div className="flex flex-col gap-6">
                <div className="h-[250px] bg-gray-400 rounded-lg" />

                <div className="flex flex-col items-center">
                    <div className="flex items-center flex-wrap gap-4">
                        {Array(5).fill(0).map((_, index) => <div key={index} className="w-16 h-16 bg-gray-200 cursor-pointer" />)}
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

FleetGalleryModal.displayName = "FleetGalleryModal"