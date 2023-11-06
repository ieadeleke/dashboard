import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BellRing, CalendarIcon, Check } from "lucide-react"
import { RecentActivity } from "@/models/activities/ActivitiesResponse"
import { cn } from "@/lib/utils"
import moment from "moment"

type RecentActvityDetailModalProps = {

}

type RecentActvityDetailOpenPayload = {
    data: RecentActivity
}

export type RecentActvityDetailModalRef = {
    open: (payload: RecentActvityDetailOpenPayload) => void,
    close: () => void
}

export const RecentActvityDetailModal = forwardRef<RecentActvityDetailModalRef, RecentActvityDetailModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [activity, setActivity] = useState<RecentActivity | null>(null)

    useEffect(() => {
        if (isVisible) {
            // setAllTrips(getTripData(4))
        }
    }, [isVisible])

    function closeModal() {
        setIsVisible(false)
        setActivity(null)
    }

    useImperativeHandle(ref, () => ({
        open(payload: RecentActvityDetailOpenPayload) {
            setActivity(payload.data)
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
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-scroll no-scrollbar md:max-w-[30vw]">
            <div className="flex flex-col gap-8">
                <h2 className="font-bold text-2xl text-center">Activity Details</h2>

                {activity && <div className="flex flex-col gap-6">
                    <Card className={cn("w-full")} {...props}>
                        <CardHeader>
                            <CardTitle>{activity.boatNo}</CardTitle>
                            <CardDescription>{activity.event}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className=" flex items-center space-x-4 rounded-md border p-4">
                                <CalendarIcon className="text-gray-800" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">Timestamp</p>
                                    <p className="text-sm text-muted-foreground">{moment(activity.createdAt).fromNow()}</p>
                                </div>
                                {/* <Switch /> */}
                            </div>
                            <div>
                                <div
                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                >
                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Trip ID
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.tripId}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={closeModal} className="w-full">
                                Dismiss
                            </Button>
                        </CardFooter>
                    </Card>
                </div>}
            </div>
        </DialogContent>
    </Dialog>

})

RecentActvityDetailModal.displayName = "RecentActvityDetailModal"