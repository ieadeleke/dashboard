import { IconButton } from "@/components/buttons/IconButton"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { Fleet } from "@/models/fleets"
import { useAddFleet } from "@/utils/apiHooks/fleets/useAddFleet"
import { HistoryIcon, MoreHorizontal } from "lucide-react"
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react"
import FleetIcon from '@/assets/icons/ic_fleet_on_water.svg'
import Button from "@/components/buttons"
import { FleetStatusChip } from "./FleetStatusChip"
import { Avatar } from "@/components/image/Avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import BlockIcon from '@/assets/icons/ic_block.svg'
import { FleetGalleryModal, FleetGalleryModalRef } from "./FleetGalleryModal"
import { useRef } from "react"
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select"
import { useSuspendFleet } from "@/utils/apiHooks/fleets/useSuspendFleet"
import { ConfirmationAlertDialog, ConfirmationAlertDialogRef } from "@/components/dialogs/ConfirmationAlertDialog"
import { useVerifyFleet } from "@/utils/apiHooks/fleets/useVerifyFleet"
import { fleetActions } from "@/redux/reducers/fleets"
import { useActivateFleet } from "@/utils/apiHooks/fleets/useActivateFleet"

type VesselInfoModalProps = {

}

type VesselInfoOpenPayload = {
    data: Fleet,
    isForApproval?: boolean
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
    const [isForApproval, setIsForApproval] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const fleetGalleryModal = useRef<FleetGalleryModalRef>(null)
    const { isLoading: isSuspendLoading, data: suspendData, suspendFleet, error: suspendError } = useSuspendFleet()
    const { isLoading: isUnSuspendLoading, data: unSuspendData, activateFleet, error: unsuspendError } = useActivateFleet()
    const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null)

    const isLoading = useMemo(() => isUnSuspendLoading || isSuspendLoading, [isUnSuspendLoading, isSuspendLoading])

    const error = useMemo(() => suspendError || unsuspendError, [suspendError, unsuspendError])

    useEffect(() => {
        if (suspendData) {
            showSnackBar({ severity: 'success', message: 'Vessel suspended' })
            setData((prevData) => {
                return Object.assign({}, prevData, { status: "suspended" })
            })
            if (data) {
                fleetActions.updateFleet({ fleet_id: data._id, data: { status: "suspended" } })
            }
        }
    }, [suspendData])

    useEffect(() => {
        if (unSuspendData) {
            showSnackBar({ severity: 'success', message: 'Vessel approved' })
            setData((prevData) => {
                return Object.assign({}, prevData, { status: "active" })
            })
            if (data) {
                fleetActions.updateFleet({ fleet_id: data._id, data: { status: "active" } })
            }
        }
    }, [unSuspendData])

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    function closeModal() {
        setIsVisible(false)
        setData(undefined)
    }

    useImperativeHandle(ref, () => ({
        open(payload) {
            setData(payload.data)
            setIsForApproval(payload.isForApproval ?? false)
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

    function handleApproveFleet(){
        handleUnsuspendVessel()
    }

    function handleViewVesselPhotos() {
        fleetGalleryModal.current?.open({
            data: data?.imgUrl.map((item) => item.url) ?? []
        })
    }

    function handleSuspendVessel() {
        if (data) {
            confirmationDialogRef.current?.show({
                data: {
                    title: `Are you sure you want to suspend this vessel?`,
                    description: ""
                },
                onCancel: () => confirmationDialogRef.current?.dismiss(),
                onConfirm: () => {
                    confirmationDialogRef.current?.dismiss()
                    suspendFleet({ boatId: data._id })
                }
            })
        }
    }

    function handleUnsuspendVessel() {
        if (data) {
            confirmationDialogRef.current?.show({
                data: {
                    title: `Are you sure you want to approve this vessel?`,
                    description: ""
                },
                onCancel: () => confirmationDialogRef.current?.dismiss(),
                onConfirm: () => {
                    confirmationDialogRef.current?.dismiss()
                    activateFleet({ boatId: data._id })
                }
            })
        }
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-[60vw] overflow-y-scroll no-scrollbar px-0 py-0">
            <FleetGalleryModal ref={fleetGalleryModal} />
            <ConfirmationAlertDialog ref={confirmationDialogRef} />
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

                            <Select>
                                <SelectTrigger className="w-auto border-none">
                                    <IconButton>
                                        <MoreHorizontal className="text-gray-500" />
                                    </IconButton>
                                </SelectTrigger>

                                <SelectContent className="w-auto px-0 py-1">
                                    <div className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleViewVesselPhotos()}>
                                        <HistoryIcon className="text-gray-400" />
                                        <p className="text-sm">View</p>
                                    </div>


                                    {data.status == 'suspended' ? <div className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleUnsuspendVessel()}>
                                        <BlockIcon className="text-gray-400" />
                                        <p className="text-sm">Unsuspend Vessel</p>
                                    </div> : <div className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuspendVessel()}>
                                        <BlockIcon className="text-gray-400" />
                                        <p className="text-sm">Suspend Vessel</p>
                                    </div>}
                                </SelectContent>
                            </Select>
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

                    {isForApproval ? <div className="flex gap-16 items-center mt-4">
                        <Button isLoading={isLoading} disabled={isLoading} onClick={closeModal} variant="outlined" className="flex-1 rounded-lg bg-gray-100 border border-primary text-primary">Cancel</Button>
                        <Button onClick={handleApproveFleet} isLoading={isLoading} disabled={isLoading} variant="contained" className="flex-1 rounded-lg">Confirm</Button>
                    </div> : <Button onClick={closeModal} isLoading={isLoading} disabled={isLoading} variant="contained" className="flex-1 rounded-lg min-h-[50px]">Close</Button>}
                </div>
            </div>
            }
        </DialogContent>
    </Dialog>

})

VesselInfoModal.displayName = "VesselInfoModal"