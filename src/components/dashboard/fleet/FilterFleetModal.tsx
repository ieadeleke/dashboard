import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { forwardRef, useImperativeHandle, useState } from "react"
import Button from "../../buttons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarIcon, ChevronDown, ChevronUp, PersonStandingIcon } from "lucide-react"
import { useRef } from "react"

export type FilterOption = "name-of-staff" | "date"

type FilterFleetPayloadParams = {
    selectedOption?: FilterOption,
    onOptionSelected?: (option: FilterOption) => void
}

type FilterFleetModalProps = {
   
}

export type FilterFleetModalRef = {
    open: (payload: FilterFleetPayloadParams) => void,
    close: () => void
}


export const FilterFleetModal = forwardRef<FilterFleetModalRef, FilterFleetModalProps>((props, ref) => {
    const [isOptionOpen, setIsOptionOpen] = useState(false)
    const [filterOption, setFilterOption] = useState<FilterOption>("name-of-staff")
    const onOptionSelected = useRef<(value: FilterOption) => void>()
    const [isVisible, setIsVisible] = useState(false)

    function closeModal() {
        setIsVisible(false)
        onOptionSelected.current = undefined
    }

    function handleOnOptionSelected(){
        onOptionSelected.current?.(filterOption)
    }

    useImperativeHandle(ref, () => ({
        open(payload) {
            setFilterOption(payload.selectedOption ?? 'name-of-staff')
            setIsVisible(true)
            onOptionSelected.current = payload.onOptionSelected
        },
        close() {
            closeModal()
        }
    }))

    function onDateSelected() {
        setFilterOption("date")
    }

    function onStaffNameSelected() {
        setFilterOption('name-of-staff')
    }

    return <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Filter</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <DropdownMenu onOpenChange={setIsOptionOpen}>
                        <DropdownMenuTrigger className="px-0">
                            <div className="flex items-center gap-4 border border-gray-300 text-gray-600 text-start py-3 px-3 rounded-lg">
                                {filterOption == 'name-of-staff' ? <PersonStandingIcon /> : <CalendarIcon />}
                                <p>{filterOption == 'name-of-staff' ? 'Name of Staff' : 'Date'}</p>
                                <div className="flex-1" />
                                {isOptionOpen ? <ChevronDown className="text-black" /> : <ChevronUp className="text-black" />}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[450px]">
                            <DropdownMenuItem onClick={onStaffNameSelected} className="text-base hover:bg-primary-500 py-2 cursor-pointer hover:text-white">Name of Staff</DropdownMenuItem>
                            <DropdownMenuItem onClick={onDateSelected} className="text-base hover:bg-primary-500 py-2 hover:text-white cursor-pointer">Date</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


                <div className="flex gap-8">
                    <Button onClick={handleOnOptionSelected} variant="contained" className="flex-1 py-3">Next</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

FilterFleetModal.displayName = "FilterFleetModal"