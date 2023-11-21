import {
    AlertDialog as BaseAlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import AbortIcon from '@/assets/icons/ic_abort.svg'
import { CheckCircleIcon, CheckIcon } from "lucide-react"

export type AdminActivitiesAlertDialogRef = {
    show: (params: ShowAdminActivitiesAlertDialogParams) => void,
    dismiss: () => void
}

type FleetDialogVariant = "regular" | "warning"

type ShowAdminActivitiesAlertDialogParams = {
    variant: FleetDialogVariant
    data: {
        title: string,
        description?: string
    },
    onConfirm?: () => void,
    onCancel?: () => void
}

type AdminActivitiesAlertDialogProps = {

}


export const AdminActivitiesAlertDialog = forwardRef<AdminActivitiesAlertDialogRef, AdminActivitiesAlertDialogProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [variant, setVariant] = useState<FleetDialogVariant>("regular")
    const [content, setContent] = useState({
        title: "",
        description: ""
    })
    const onConfirm = useRef<() => void>()
    const onCancel = useRef<() => void>()

    useImperativeHandle(ref, () => ({
        show(params: ShowAdminActivitiesAlertDialogParams) {
            setContent({
                title: params.data.title,
                description: params.data.description || ""
            })
            setVariant(params.variant)
            onConfirm.current = params.onConfirm
            onCancel.current = params.onCancel
            setIsVisible(true)
        },
        dismiss() {
            dismissDialog()
        }
    }))

    function dismissDialog() {
        setIsVisible(false)
        setContent({ title: "", description: "" })
        onConfirm.current = undefined
        onCancel.current = undefined
    }

    return <BaseAlertDialog open={isVisible}>
        <AlertDialogContent>
            <AlertDialogHeader className="flex flex-col gap-5">
                <AlertDialogTitle className="text-center font-medium text-3xl text-primary">Success</AlertDialogTitle>

                <div className="flex justify-center self-center bg-primary-100 text-primary rounded-full p-4">
                    <CheckCircleIcon className="w-12 h-12" />
                </div>

                <AlertDialogDescription className="text-center text-gray-500 text-base">
                    Success
                </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
    </BaseAlertDialog>
})

AdminActivitiesAlertDialog.displayName = "AdminActivitiesAlertDialog"