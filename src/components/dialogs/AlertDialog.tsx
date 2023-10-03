import {
    AlertDialog as BaseAlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import AbortIcon from '@/assets/icons/ic_abort.svg'
import NotificationIcon from '@/assets/icons/ic_notification.svg'

export type IncidentAlertDialogRef = {
    show: (params: ShowIncidentAlertDialogParams) => void,
    dismiss: () => void
}

type FleetDialogVariant = "regular" | "warning"

type ShowIncidentAlertDialogParams = {
    variant: FleetDialogVariant
    data: {
        title: string,
        description?: string
    },
    onConfirm?: () => void,
    onCancel?: () => void
}

type IncidentAlertDialogProps = {
    
}


export const IncidentAlertDialog = forwardRef<IncidentAlertDialogRef, IncidentAlertDialogProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [variant, setVariant] = useState<FleetDialogVariant>("regular")
    const [content, setContent] = useState({
        title: "",
        description: ""
    })
    const onConfirm = useRef<() => void>()
    const onCancel = useRef<() => void>()

    useImperativeHandle(ref, () => ({
        show(params: ShowIncidentAlertDialogParams) {
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

    function dismissDialog(){
        setIsVisible(false)
        setContent({title: "", description: ""})
        onConfirm.current = undefined
        onCancel.current = undefined
    }

    return <BaseAlertDialog open={isVisible}>
        <AlertDialogContent>
            <AlertDialogHeader>
                {variant == 'warning' ? <div className="flex justify-center self-center bg-red-50 text-red-500 rounded-full p-2">
                    <AbortIcon className="w-9 h-9" />
                </div> : <div className="flex justify-center self-center bg-primary-20 text-primary rounded-full p-2"><NotificationIcon className="w-9 h-9" /></div>}
                <AlertDialogTitle className="text-center font-medium text-2xl text-[#3F3F3F]">{content.title || ""}</AlertDialogTitle>
                <AlertDialogDescription>
                    {content.description || ""}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className={`flex-1 py-6 ${variant == 'warning' ? 'text-red-500' : 'text-primary'}`} onClick={onCancel.current}>{"No"}</AlertDialogCancel>
                
                <AlertDialogAction className={`flex-1 py-6 ${variant == 'warning' ? 'bg-red-500' : 'bg-primary'}`} onClick={onConfirm.current}>{"Yes"}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </BaseAlertDialog>
})