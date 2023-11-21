import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Fleet } from "@/models/fleets"
import Button from "@/components/buttons"
import { IncidentAlertDialog, IncidentAlertDialogRef } from "@/components/dialogs/AlertDialog"
import { useSuspendFleet } from "@/utils/apiHooks/fleets/useSuspendFleet"
import { useVerifyFleet } from "@/utils/apiHooks/fleets/useVerifyFleet"
import { fleetActions } from "@/redux/reducers/fleets"
import { useContext } from "react"
import { GlobalActionContext } from "@/context/GlobalActionContext"

type FleetOptionModalProps = {

}

type FleetOptionOpenPayload = {
    data: Fleet
}

export type FleetOptionModalRef = {
    open: (payload: FleetOptionOpenPayload) => void,
    close: () => void
}

export const FleetOptionModal = forwardRef<FleetOptionModalRef, FleetOptionModalProps>((_, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [fleet, setFleet] = useState<Fleet | null>(null)
    const { isLoading: isVerifyLoading, error: verifyError, verifyFleet, data: verifyData } = useVerifyFleet()
    const { isLoading: isSuspendLoading, error: suspendError, suspendFleet, data: suspendData } = useSuspendFleet()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const alertRef = useRef<IncidentAlertDialogRef>(null)
    const { showSnackBar } = useContext(GlobalActionContext)

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (verifyData && fleet) {
            const updatedFleet = Object.assign({}, fleet, { status: "active" })
            fleetActions.updateFleet({
                fleet_id: fleet._id,
                data: updatedFleet
            })
            showSnackBar({ severity: 'success', message: `${fleet.model} has been verified successfully` })
            closeModal()
        }
    }, [verifyData])

    useEffect(() => {
        if (suspendData && fleet) {
            const updatedFleet = Object.assign({}, fleet, { status: "suspended" })
            fleetActions.updateFleet({
                fleet_id: fleet._id,
                data: updatedFleet
            })
            showSnackBar({ severity: 'success', message: `${fleet.model} has been disapproved successfully` })
            closeModal()
        }
    }, [suspendData])

    useEffect(() => {
        setIsLoading(isSuspendLoading || isVerifyLoading)
    }, [isSuspendLoading, isVerifyLoading])

    useEffect(() => {
        setError(suspendError || verifyError)
    }, [suspendError, verifyError])

    useEffect(() => {
        if (isVisible) {
            // setAllTrips(getTripData(4))
        }
    }, [isVisible])

    function handleVerifyFleet() {
        if (fleet) {
            alertRef.current?.show({
                variant: "regular",
                data: {
                    title: "Are you sure you want to confirm?",
                    description: "This action can't be undone",
                },
                onConfirm: () => {
                    alertRef.current?.dismiss()
                    verifyFleet({ boatId: fleet._id })
                },
                onCancel: () => {
                    alertRef.current?.dismiss()
                }
            })
        }
    }

    function handleSuspendFleet() {
        if (fleet) {
            alertRef.current?.show({
                variant: "regular",
                data: {
                    title: "Are you sure you want to suspend this fleet?",
                    description: "",
                },
                onConfirm: () => {
                    alertRef.current?.dismiss()
                    suspendFleet({ boatId: fleet._id })
                },
                onCancel: () => {
                    alertRef.current?.dismiss()
                }
            })
        }
    }

    function closeModal() {
        setIsVisible(false)
        setFleet(null)
    }

    useImperativeHandle(ref, () => ({
        open(payload: FleetOptionOpenPayload) {
            setFleet(payload.data)
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
        <DialogContent className="max-w-screen max-h-[90vh] overflow-y-scroll no-scrollbar md:max-w-[50vw] lg:max-w-[60vw]">
            <IncidentAlertDialog ref={alertRef} />

            <div className="flex flex-col gap-8 px-8 md:px-[10%]">
                <h2 className="font-bold text-2xl text-center">View [Ship Info]</h2>

                <div className="flex flex-col gap-6 h-[400px]">
                    <div className="flex-1" />

                    <div className="flex items-center gap-8">
                        <Button isLoading={isSuspendLoading} disabled={isLoading} onClick={handleSuspendFleet} variant="contained" className="bg-red-600 flex-1">Disapprove</Button>

                        <Button onClick={handleVerifyFleet} isLoading={isVerifyLoading} disabled={isLoading} variant="contained" className="bg-primary flex-1">Approve</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

FleetOptionModal.displayName = "FleetOptionModal"