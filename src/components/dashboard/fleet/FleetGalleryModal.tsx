import { IconButton } from "@/components/buttons/IconButton"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { Fleet } from "@/models/fleets"
import { XIcon } from "lucide-react"
import { useMemo } from "react"
import { forwardRef, useContext, useImperativeHandle, useState } from "react"

type FleetGalleryModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

type VesselGalleryOpenPayload = {
    data: string[]
}

export type FleetGalleryModalRef = {
    open: (payload: VesselGalleryOpenPayload) => void,
    close: () => void
}

export const FleetGalleryModal = forwardRef<FleetGalleryModalRef, FleetGalleryModalProps>((props, ref) => {

    const { showSnackBar } = useContext(GlobalActionContext)
    const [isVisible, setIsVisible] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [data, setData] = useState<string[]>([])

    function closeModal() {
        setIsVisible(false)
        setData([])
    }

    useImperativeHandle(ref, () => ({
        open(payload) {
            setData(payload.data)
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

    function updateCurrentImage(image: string) {
        const index = data.findIndex((item) => item == image)
        if (index != -1) {
            setCurrentIndex(index)
        }
    }

    const currentImage = useMemo(() => data[currentIndex], [currentIndex, JSON.stringify(data)])

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <IconButton onClick={closeModal} className="self-end text-gray-500">
                    <XIcon />
                </IconButton>
            </div>

            {data.length > 0 && <div className="flex flex-col gap-6">
                <div style={{
                    backgroundImage: `url(${currentImage})`
                }} className="h-[250px] bg-gray-400 rounded-lg bg-no-repeat bg-cover bg-center" />

                <div className="flex flex-col items-center">
                    <div className="flex items-center flex-wrap gap-4">
                        {data.filter((item) => item != currentImage).map((item, index) => <div onClick={() => updateCurrentImage(item)} key={index} style={{
                            backgroundImage: `url(${item})`
                        }} className="w-16 h-16 bg-gray-200 cursor-pointer bg-no-repeat bg-cover bg-center" />)}
                    </div>
                </div>
            </div>
            }
        </DialogContent>
    </Dialog>

})

FleetGalleryModal.displayName = "FleetGalleryModal"