import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { forwardRef, useImperativeHandle, useState } from "react"
import Button from "../buttons"
import { InputProps, TextField } from "../input/InputText"

type AddOperatorsModalProps = {

}

export type AddOperatorsModalRef = {
    open: () => void,
    close: () => void
}

const OperatorInputField = ({ className, ...props }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    function onBlur() {
        setIsFocused(false)
    }

    function onFocus() {
        setIsFocused(true)
    }

    return <TextField.Container className={cn(`border ${isFocused ? 'border-[#6BC3FF]' : 'border-gray-100'}`)}>
        <TextField.Input onBlur={onBlur} onFocus={onFocus} {...props} />
    </TextField.Container>
}

export const AddOperatorsModal = forwardRef<AddOperatorsModalRef, AddOperatorsModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    function closeModal(){
        setIsVisible(false)
    }

    useImperativeHandle(ref, () => ({
        open(){
            setIsVisible(true)
        },
        close(){
            closeModal()
        }
    }))

    function onOpenChange(value: boolean){
        if(!value){
            closeModal()
        }
    }
    
    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent>
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Add Operators</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">First Name*</h4>
                    <OperatorInputField />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Last Name*</h4>
                    <OperatorInputField />
                </div>  

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Home Address*</h4>
                    <OperatorInputField />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Phone Number*</h4>
                    <OperatorInputField inputMode="numeric" />
                </div>

                <div className="flex gap-8" onClick={closeModal}>
                    <Button variant="outlined" className="flex-1 py-3">Close</Button>

                    <Button variant="contained" className="flex-1 py-3">Next</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})