import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useImperativeHandle, useState } from "react"
import { Trip } from "@/utils/data/trip"
import { TripHistoryStatusChip } from "../trip-history/TripHistoryStatusChip"

type TripDetailModalProps = {

}

type TripDetailOpenPayload = {
    data: Trip
}

export type TripDetailModalRef = {
    open: (payload: TripDetailOpenPayload) => void,
    close: () => void
}

export const TripDetailModal = forwardRef<TripDetailModalRef, TripDetailModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [trip, setTrip] = useState<Trip | null>(null)

    function closeModal() {
        setIsVisible(false)
        setTrip(null)
    }

    useImperativeHandle(ref, () => ({
        open(payload: TripDetailOpenPayload) {
            setTrip(payload.data)
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

                {trip && <div className="flex flex-col gap-6">
                    <div className="flex items-center">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Ship ID</p>
                            <p className="text-sm">{trip.ship_id}</p>
                        </div>
                        <div className="flex-1" />

                        <TripHistoryStatusChip status={trip.status} />
                    </div>
                </div>}
            </div>
        </DialogContent>
    </Dialog>

})