import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Admin } from "@/models/admins"
import Button from "@/components/buttons"
import { useRecentActivities } from "@/utils/apiHooks/activities/useRecentActivities"
import { ActivityItem } from "../RecentActivities"
import { RecentActvityDetailModal, RecentActvityDetailModalRef } from "../activities/RecentActivityDetail"
import { RecentActivity } from "@/models/activities/ActivitiesResponse"
import { AdminActivitiesAlertDialog, AdminActivitiesAlertDialogRef } from "./AdminActivitiesAlertDialog"
import { useContext } from "react"
import { GlobalActionContext } from "@/context/GlobalActionContext"

type AdminActivitiesModalProps = {

}

type AdminActivitiesOpenPayload = {
    data: Admin
}

export type AdminActivitiesModalRef = {
    open: (payload: AdminActivitiesOpenPayload) => void,
    close: () => void
}

export const AdminActivitiesModal = forwardRef<AdminActivitiesModalRef, AdminActivitiesModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [admin, setAdmin] = useState<Admin | null>(null)
    const { isLoading, error, getRecentActivities, data } = useRecentActivities()
    const recentActivityDetailRef = useRef<RecentActvityDetailModalRef>(null)
    const adminActititesAlertRef = useRef<AdminActivitiesAlertDialogRef>(null)
    const { showSnackBar } = useContext(GlobalActionContext)

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (isVisible) {
            getRecentActivities()
        }
    }, [isVisible])

    function closeModal() {
        setIsVisible(false)
        setAdmin(null)
    }

    useImperativeHandle(ref, () => ({
        open(payload: AdminActivitiesOpenPayload) {
            setAdmin(payload.data)
            setIsVisible(true)
        },
        close() {
            closeModal()
        }
    }))

    function showSuccessDialog() {
        adminActititesAlertRef.current?.show({
            data: {
                title: "",
                description: ""
            },
            variant: "regular"
        })

        setTimeout(() => {
            adminActititesAlertRef.current?.dismiss()
            recentActivityDetailRef.current?.close()
            closeModal()
        }, 2000)
    }

    function onOpenChange(value: boolean) {
        if (!value) {
            closeModal()
        }
    }

    function handleOpenActivityModal(activity: RecentActivity) {
        recentActivityDetailRef.current?.open({
            data: activity
        })
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-screen h-[90vh] max-h-[90vh] md:max-w-[90vw] lg:max-w-[70vw]">
            <RecentActvityDetailModal ref={recentActivityDetailRef} />
            <AdminActivitiesAlertDialog ref={adminActititesAlertRef} />
            <div className="flex flex-col flex-1">
                <div style={{
                    flex: '1 1 0'
                }} className="flex-col overflow-y-auto no-scrollbar gap-8">
                    <h2 className="font-bold text-2xl text-center">User Activities</h2>

                    {admin && <div className="">
                        {data.map((item) => <div key={item._id} onClick={() => handleOpenActivityModal(item)}>
                            <ActivityItem data={item} />
                        </div>)}
                    </div>}

                </div>

                <div className="flex items-center gap-8">
                    <Button onClick={closeModal} disabled={isLoading} variant="outlined" className="flex-1">Cancel</Button>

                    <Button onClick={showSuccessDialog} disabled={isLoading} variant="contained" className="bg-primary flex-1">Save</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

AdminActivitiesModal.displayName = "AdminActivitiesModal"