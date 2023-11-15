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

export type FilterTripHistoryOption = "name" | "date"

type FilterFleetPayloadParams = {
    selectedOption?: FilterTripHistoryOption,
    onOptionSelected?: (option: FilterTripHistoryOption) => void
}

type FilterTripHistoryModalProps = {
   
}

export type FilterTripHistoryModalRef = {
    open: (payload: FilterFleetPayloadParams) => void,
    close: () => void
}


export const FilterTripHistoryModal = forwardRef<FilterTripHistoryModalRef, FilterTripHistoryModalProps>((props, ref) => {
    const [isOptionOpen, setIsOptionOpen] = useState(false)
    const [filterOption, setFilterOption] = useState<FilterTripHistoryOption>("name")
    const onOptionSelected = useRef<(value: FilterTripHistoryOption) => void>()
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
            setFilterOption(payload.selectedOption ?? 'name')
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
        setFilterOption('name')
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
                                {filterOption == 'name' ? <PersonStandingIcon /> : <CalendarIcon />}
                                <p>{filterOption == 'name' ? 'Name' : 'Date'}</p>
                                <div className="flex-1" />
                                {isOptionOpen ? <ChevronDown className="text-black" /> : <ChevronUp className="text-black" />}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[450px]">
                            <DropdownMenuItem onClick={onStaffNameSelected} className="text-base hover:bg-primary-500 py-2 cursor-pointer hover:text-white">Name</DropdownMenuItem>
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

FilterTripHistoryModal.displayName = "FilterTripHistoryModal"