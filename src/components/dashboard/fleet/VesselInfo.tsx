import { IconButton } from "@/components/buttons/IconButton"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { Fleet } from "@/models/fleets"
import { useAddFleet } from "@/utils/apiHooks/fleets/useAddFleet"
import { MoreHorizontal } from "lucide-react"
import { forwardRef, useContext, useImperativeHandle, useMemo, useState } from "react"
import FleetIcon from '@/assets/icons/ic_fleet_on_water.svg'
import Button from "@/components/buttons"
import { FleetStatusChip } from "./FleetStatusChip"
import { Avatar } from "@/components/image/Avatar"

type VesselInfoModalProps = {

}

type VesselInfoOpenPayload = {
    data: Fleet
}

export type VesselInfoModalRef = {
    open: (payload: VesselInfoOpenPayload) => void,
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
    const [data, setData] = useState<Fleet>()
    const [isVisible, setIsVisible] = useState(false)

    function closeModal() {
        setIsVisible(false)
        setData(undefined)
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

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-[60vw] overflow-y-scroll no-scrollbar px-0 py-0">
            {data && <div className="flex flex-col">
                <div className="h-28 bg-primary" />
                <div className="px-8 flex flex-col gap-4 pb-8">
                    <div className="-mt-14 flex items-baseline">
                        <div className="flex flex-col">
                            <Avatar src={data.imgUrl.length > 0 ? data.imgUrl[0].url : undefined} className="w-28 h-28 bg-gray-500" />
                            <p className="text-2xl font-bold">{data.boatName}</p>
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                            <div className='flex-1' />
                            <FleetStatusChip status={data.status} />

                            <IconButton>
                                <MoreHorizontal />
                            </IconButton>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Vessel Info</p>
                        <p className="text-sm">Has this vessel previously been used as a commercial vessel in Nigeria or overseas and is now being registered in Lagos for the first time?: <span className="font-bold">{data.previouslyRegister ? "Yes" : "NO"}</span></p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <VesselInfoChip title="Vessel Type" value={data.typeOfVessel} />
                        <VesselInfoChip title="Hull Color" value={data.HullColor} />
                        <VesselInfoChip title="Seat Number" value={data.capacity} />
                        <VesselInfoChip title="Construction Material" value={data.constructionMaterial} />
                        <VesselInfoChip title="Superstructure Color" value={data.superstructureColor} />
                        <VesselInfoChip title="Vessel Use" value={data.useOfVessel} />
                        <VesselInfoChip title="Hull Color" value={data.HullColor} />
                        <VesselInfoChip title="Do you have a valid Lagos State Operational Commercial Ferry License?" value={data.validLagosStateOperational ? "Yes" : "No"} />
                        <VesselInfoChip title="When was is Issued?" value={data.manufactureYear} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold">Safety Equipment</h1>

                        <div className="flex items-center flex-wrap gap-4">
                            <VesselInfoChip title="Standard Life Jacket for boat capacity:" value={data.lifeJacket ? "Yes" : "No"} />
                            <VesselInfoChip title="First aid Kit:" value={data.firstAid ? "Yes" : "No"} />
                        </div>
                    </div>

                    <div className="flex gap-16 items-center mt-4">
                        <Button variant="outlined" className="flex-1 rounded-lg bg-gray-100 border border-primary text-primary">Cancel</Button>
                        <Button variant="contained" className="flex-1 rounded-lg">Confirm</Button>
                    </div>
                </div>
            </div>
            }
        </DialogContent>
    </Dialog>

})

VesselInfoModal.displayName = "VesselInfoModal"