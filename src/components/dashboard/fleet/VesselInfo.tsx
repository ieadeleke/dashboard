import { IconButton } from "@/components/buttons/IconButton"
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
import { MoreHorizontal } from "lucide-react"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react"
import FleetIcon from '@/assets/icons/ic_fleet_on_water.svg'
import Button from "@/components/buttons"

type VesselInfoModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

export type VesselInfoModalRef = {
    open: () => void,
    close: () => void
}

type VesselInfoChipProps = {
    title: string,
    value: string
}

const VesselInfoChip = (props: VesselInfoChipProps) => {
    return <div className="flex items-center gap-2">
        <div className="bg-blue-400 p-2 rounded-sm">
            <FleetIcon className="text-primary" />
        </div>

        <p className="text-sm">{props.title}</p>

        <p className="text-sm font-bold">{props.value}</p>
    </div>
}

export const VesselInfoModal = forwardRef<VesselInfoModalRef, VesselInfoModalProps>((props, ref) => {
    const { showSnackBar } = useContext(GlobalActionContext)
    const { isLoading, error, data, addFleet } = useAddFleet()
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
        <DialogContent className="max-h-[90vh] max-w-[60vw] overflow-y-scroll no-scrollbar px-0 py-0">
            <div className="flex flex-col">
                <div className="h-28 bg-primary" />
                <div className="px-8 flex flex-col gap-4 pb-8">
                    <div className="-mt-14 flex items-baseline">
                        <div className="flex flex-col">
                            <div className="w-28 h-28 rounded-full bg-gray-500" />
                            <p className="text-2xl font-bold">Lorem Ipsum</p>
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                            <div className='flex-1' />
                            <p className="bg-blue-200 text-blue-500 px-2 py-2 rounded-md text-sm">Active</p>

                            <IconButton>
                                <MoreHorizontal />
                            </IconButton>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Vessel Info</p>
                        <p className="text-sm">Has this vessel previously been used as a commercial vessel in Nigeria or overseas and is now being registered in Lagos for the first time?: <span className="font-bold">N0</span></p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <VesselInfoChip title="Vessel Type" value="Fishing Boat" />
                        <VesselInfoChip title="Hull Color" value="White" />
                        <VesselInfoChip title="Seat Number" value="16" />
                        <VesselInfoChip title="Construction Material" value="Steel" />
                        <VesselInfoChip title="Superstructure Color" value="White" />
                        <VesselInfoChip title="Vessel Use" value="Fishing" />
                        <VesselInfoChip title="Hull Color" value="White" />
                        <VesselInfoChip title="Do you have a valid Lagos State Operational Commercial Ferry License?" value="Yes" />
                        <VesselInfoChip title="When was is Issued?" value="20/02/2022" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold">Safety Equipment</h1>

                        <div className="flex items-center flex-wrap gap-4">
                            <VesselInfoChip title="Standard Life Jacket for boat capacity:" value="Yes" />
                            <VesselInfoChip title="First aid Kit:" value="Yes" />
                        </div>
                    </div>

                    <div className="flex gap-16 items-center mt-4">
                        <Button variant="outlined" className="flex-1 rounded-lg bg-gray-100 border border-primary text-primary">Cancel</Button>
                        <Button variant="contained" className="flex-1 rounded-lg">Confirm</Button>
                    </div>
                </div>
            </div>


        </DialogContent>
    </Dialog>

})

VesselInfoModal.displayName = "VesselInfoModal"