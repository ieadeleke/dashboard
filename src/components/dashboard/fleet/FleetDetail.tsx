import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
// import { getTripData, Trip } from "@/utils/data/trip"
import { TripHistoryStatusChip } from "../trip-history/TripHistoryStatusChip"
import { TripHistoryItem } from "../trip-history/TripHistoryItem"
import { Trip } from "@/models/trips"
import { Fleet } from "@/models/fleets"
import { DEFAULT_PROFILE_URL } from "@/utils/constants/strings"
import { FleetStatusChip } from "./FleetStatusChip"
import { Avatar } from "@/components/image/Avatar"

type BoatDetailModalProps = {

}

type BoatDetailOpenPayload = {
    data: Fleet
}

export type BoatDetailModalRef = {
    open: (payload: BoatDetailOpenPayload) => void,
    close: () => void
}

export const BoatDetailModal = forwardRef<BoatDetailModalRef, BoatDetailModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [fleet, setFleet] = useState<Fleet | null>(null)
    const [allTrips, setAllTrips] = useState<Trip[]>([])

    useEffect(() => {
        if (isVisible) {
            // setAllTrips(getTripData(4))
        }
    }, [isVisible])

    function closeModal() {
        setIsVisible(false)
        setFleet(null)
        setAllTrips([])
    }

    useImperativeHandle(ref, () => ({
        open(payload: BoatDetailOpenPayload) {
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
        <DialogContent className="max-w-screen max-h-[90vh] overflow-y-scroll no-scrollbar md:max-w-[90vw] lg:max-w-[70vw]">
            <div className="flex flex-col gap-8">
                <h2 className="font-bold text-2xl text-center">Fleet Details</h2>

                {fleet && <div className="flex flex-col gap-6">
                    <div className="flex items-center">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Boat Name</p>
                            <p className="text-sm">{fleet.model}</p>
                        </div>
                        <div className="flex-1" />

                        <FleetStatusChip status={fleet.status} />
                    </div>

                    <div className="flex gap-4">
                        <img className="bg-gray-300 w-36 object-contain object-center h-44 rounded-lg" src={DEFAULT_PROFILE_URL} />

                        <div className="flex flex-1 flex-col gap-4">
                            <div className="flex gap-2">
                                <div className="flex-1 bg-gray-100 rounded-sm px-2 py-2">
                                    <p>{fleet.User.lastName} {fleet.User.firstName}</p>
                                </div>

                                <div className="flex-1 bg-gray-100 rounded-sm px-2 py-2">
                                    <p>{fleet.User.email}</p>
                                </div>

                                <div className="flex-1 bg-gray-100 rounded-sm px-2 py-2">
                                    <p>{fleet.User.phoneNumber}</p>
                                </div>
                                {/* {Array(3).fill(0).map((_, index) => <div key={index} className="flex-1 h-6 bg-gray-500 rounded-sm" />)} */}
                            </div>

                            <div className="flex flex-col gap-3 bg-gray-100 py-2 px-2 rounded-md">
                                <h1 className="font-bold">Captains:</h1>

                                {(fleet.captains || []).slice(0, 3).map((item) => <div key={item._id}>
                                    <div className="flex gap-3 items-start border border-gray-300 rounded-lg px-2 py-2">
                                        <Avatar src={DEFAULT_PROFILE_URL} />
                                        <div>
                                            <h1 className="font-semibold text-sm">{item.firstName} {item.lastName}</h1>
                                            <p className="text-sm">{item.email}</p>
                                        </div>
                                    </div>
                                </div>)}
                            </div>

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

BoatDetailModal.displayName = "BoatDetailModal"