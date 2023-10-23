import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
// import { getTripData, Trip } from "@/utils/data/trip"
import { TripHistoryStatusChip } from "../trip-history/TripHistoryStatusChip"
import { TripHistoryItem } from "../trip-history/TripHistoryItem"
import { Trip } from "@/models/trips"

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
    const [allTrips, setAllTrips] = useState<Trip[]>([])

    useEffect(() => {
        if (isVisible) {
            // setAllTrips(getTripData(4))
        }
    }, [isVisible])

    function closeModal() {
        setIsVisible(false)
        setTrip(null)
        setAllTrips([])
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
        <DialogContent className="max-w-screen max-h-[90vh] overflow-y-scroll no-scrollbar md:max-w-[90vw] lg:max-w-[70vw]">
            <div className="flex flex-col gap-8">
                <h2 className="font-bold text-2xl text-center">Trip Details</h2>

                {trip && <div className="flex flex-col gap-6">
                    <div className="flex items-center">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Ship ID</p>
                            <p className="text-sm">{"asdasddsa"}</p>
                        </div>
                        <div className="flex-1" />

                        <TripHistoryStatusChip status={"active"} />
                    </div>

                    <div className="flex gap-4">
                        <img className="bg-gray-300 w-36 h-28 rounded-lg" />

                        <div className="flex flex-1 flex-col gap-4">
                            <div className="flex gap-2">
                                {Array(3).fill(0).map((_, index) => <div key={index} className="flex-1 h-6 bg-gray-500 rounded-sm" />)}
                            </div>

                            <div className="bg-gray-500 h-32 rounded-md" />

                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {allTrips.map((item) => <TripHistoryItem data={item} key={"item.id"} />)}
                            </div>
                        </div>

                    </div>
                </div>}
            </div>
        </DialogContent>
    </Dialog>

})

TripDetailModal.displayName = "TripDetailModal"