import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { forwardRef, useImperativeHandle, useState } from "react"
import Button from "../../buttons"
import { CheckBox } from "../../buttons/CheckBox"
import { Divider } from "../../Divider"
import { InputProps, TextField } from "../../input/InputText"

type CreateRoleModalProps = {

}

export type CreateRoleModalRef = {
    open: () => void,
    close: () => void
}

const CreateRoleInputField = ({ className, ...props }: InputProps) => {
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

export const CreateRoleModal = forwardRef<CreateRoleModalRef, CreateRoleModalProps>((props, ref) => {
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
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Create Role</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Role Name*</h4>
                    <CreateRoleInputField placeholder="e.g Editor" />
                </div>

                <div className="flex justify-center items-center h-10 bg-primary text-white">
                    <h1 className="text-center">Permisson</h1>
                </div>

                <div className="flex flex-col gap-2">
                    {Array(5).fill(0).map((_, index) => <div className="flex items-center gap-2" key={index}>
                        <CheckBox />
                        <p className="text-sm font-medium">Permission {index + 1}</p>
                    </div>)}
                </div>

                <div className="flex gap-8" onClick={closeModal}>
                    <Button variant="outlined" className="flex-1 py-2 border-none bg-[#F1F1F1]">Cancel</Button>

                    <Button variant="contained" className="flex-1 py-2">Save</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})