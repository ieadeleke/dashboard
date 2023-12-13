import { CalendarPicker } from "@/components/calendar/CalendarPicker"
import { Divider } from "@/components/Divider"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { cn } from "@/lib/utils"
import { Fleet } from "@/models/fleets"
import { CalendarIcon, ChevronDown } from "lucide-react"
import moment from "moment"
import { useReducer } from "react"
import { ChangeEvent, forwardRef, useContext, useImperativeHandle, useState } from "react"
import Button from "../../buttons"
import { InputProps, TextAreaProps, TextField } from "../../input/InputText"
import { z } from 'zod';
import { useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type ScheduleInspectionDateModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

export type ScheduleInspectionDateModalRef = {
    open: () => void,
    close: () => void
}

const AdminInputField = ({ className, renderInputType, ...props }: InputProps & { renderInputType?: "input" | "text-area" }) => {
    const [isFocused, setIsFocused] = useState(false)

    function onBlur() {
        setIsFocused(false)
    }

    function onFocus() {
        setIsFocused(true)
    }

    return <TextField.Container className={cn(`border ${isFocused ? 'border-[#6BC3FF]' : 'border-gray-100'}`)}>
        {renderInputType == 'text-area' ? <TextField.TextArea onBlur={onBlur as any} onFocus={onFocus as any} {...props as TextAreaProps} /> : <TextField.Input onBlur={onBlur} onFocus={onFocus} {...props} />}
    </TextField.Container>
}

const schema = z
    .object({
        time: z.string({ required_error: "Invalid time" }).regex(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid time"),
        date: z.string({ required_error: "Invalid date" }).regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, "Invalid date"),
        accident_location: z.string({ required_error: "Insert a valid location" }).min(3, "Location must be at least 3 characters").max(500),
        boat_name: z.string({ required_error: "Invalid boat name" }).min(3, "Boat name must be at least 3 characters").max(20, "Boat name should not be more than 20 characters"),
        boat_type: z.string().optional(),
        no_of_passengers_onboard: z.number({ required_error: "Invalid onboard passengers value. Must be between 1-99" }).min(1, "No of passengers onboard should be at least 1").max(99, "No of passengers onboard should be a maximum of 99"),
        no_of_passengers_rescued: z.number({ required_error: "Invalid rescued passengers value. Must be between 1-99" }).min(1, "No of passengers rescued should be at least 1").max(99, "No of passengers rescued should be a maximum of 99"),
        no_of_passengers_missing: z.number({ required_error: "Invalid missing passengers value. Must be between 1-99" }).min(1, "No of missing passengers should be at least 1").max(99, "No of missing passengers should be a maximum of 99"),
        no_of_injured_passengers: z.number({ required_error: "Invalid injured passengers value. Must be between 1-99" }).min(1, "No of injured passengers should be at least 1").max(99, "No of injured passengers should be a maximum of 99"),
        cause_of_accident: z.string({ required_error: "Cause of accident must be 3 characters and above" }).min(1, "Cause of accident must be 3 characters and above").max(99, "Cause of accident must be 3 characters and above"),
        comments: z.string()
    }).required();

type FormState = {
    location?: string,
    inspection_officer?: string,
    time: string,
    date: string,
}

type FormAction = Partial<FormState>

const default_state: FormState = {
    time: "12:00",
    date: "12/12/12"
}

function reducer(state: FormState, action: FormAction) {
    return Object.assign({}, state, action)
}

export const ScheduleInspectionDateModal = forwardRef<ScheduleInspectionDateModalRef, ScheduleInspectionDateModalProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, default_state)

    const { showSnackBar } = useContext(GlobalActionContext)
    const [isVisible, setIsVisible] = useState(true)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [hour, setHour] = useState(12)
    const [minute, setMinute] = useState(30)
    const [timeOfDay, setTimeOfDay] = useState<"am" | "pm">("am")

    function closeModal() {
        setIsVisible(false)
    }

    function submit() {
        try {
            const response = schema.parse(state)
        } catch (error) {
            if (error.issues && error.issues.length > 0) {
                showSnackBar({ severity: 'error', message: error.issues[0].message })
            }
        }
    }

    useEffect(() => {
        dispatch({ time: `${hour}:${minute} ${timeOfDay == 'am' ? "AM" : "PM"}` })
    }, [timeOfDay, hour, minute])


    useEffect(() => {
        dispatch({ date: moment(date).format("DD/MM/YYYY") })
    }, [date])

    function updateHour(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        setHour(isNaN(value) ? 12 : value)
    }

    function updateMinute(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        setMinute(isNaN(value) ? 12 : value)
    }

    function onLocationChanged(value: string) {
        dispatch({ location: value })
    }

    function onInspectionOfficerChanged(value: string) {
        dispatch({ inspection_officer: value })
    }

    useImperativeHandle(ref, () => ({
        open() {
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

    function updateTimeOfDay(time: "am" | "pm") {
        setTimeOfDay(time)
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-semibold text-2xl text-center">Schedule Inspection Date</h2>
            </div>

            <Divider />

            <div className="flex flex-col gap-6">

                <div className="flex flex-col gap-0">
                    <Popover modal open={isDateModalOpen} onOpenChange={setIsDateModalOpen}>
                        <PopoverTrigger className="flex-1">
                            <div className="flex flex-1 items-center gap-4 border py-2 px-3 -mx-2">
                                <p className="text-black text-start text-sm line-clamp-1 flex-1">{state.date}</p>

                                <CalendarIcon className="h-8 w-8 opacity-50 text-gray-600 bg-gray-300 p-2 rounded-full" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarPicker showOutsideDays onNewDateApplied={setDate} />
                        </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-400">MM/DD/YYYY</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Time</h4>
                    <div className={`border border-gray-100 p-2`}>
                        <div className="flex gap-2">
                            <div>
                                <input inputMode="numeric" maxLength={2} value={hour} onChange={updateHour} placeholder="00" className="border p-2 w-12 text-center" />
                                <p className="text-xs">Hour</p>
                            </div>

                            <h1 className="text-lg font-bold mt-2">:</h1>

                            <div >
                                <input inputMode="numeric" maxLength={2} onChange={updateMinute} value={minute} placeholder="00" className="border p-2 w-12 text-center" />
                                <p className="text-xs">Minute</p>
                            </div>

                            <div className="flex flex-col border">
                                <p onClick={() => updateTimeOfDay("am")} className={`${timeOfDay == 'am' ? 'bg-gray-200' : 'bg-transparent'} px-2 text-sm flex-1 text-center pt-1 cursor-pointer`}>AM</p>
                                <p onClick={() => updateTimeOfDay("pm")} className={`${timeOfDay == 'pm' ? 'bg-gray-200' : 'bg-transparent'} flex-1 px-2 text-sm text-center pt-1 cursor-pointer`}>PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Location</h4>
                    <Select onValueChange={onLocationChanged}>
                        <SelectTrigger className="flex items-center border rounded-lg h-10 w-full">
                            <p className="text-gray-500">{state.location ?? "Select"}</p>
                            <ChevronDown className="text-gray-500" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='fire'>Fire</SelectItem>
                            <SelectItem value='water'>Water</SelectItem>
                            <SelectItem value='earth'>Earth</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Inspection Officer</h4>
                    <Select onValueChange={onInspectionOfficerChanged}>
                        <SelectTrigger className="flex items-center border rounded-lg h-10 w-full">
                            <p className="text-gray-500">{state.inspection_officer ?? "Select"}</p>
                            <ChevronDown className="text-gray-500" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='fire'>Fire</SelectItem>
                            <SelectItem value='water'>Water</SelectItem>
                            <SelectItem value='earth'>Earth</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-8">
                    <Button onClick={closeModal} variant="outlined" className="flex-1 py-3 bg-gray-100">No</Button>

                    <Button onClick={submit} variant="contained" className="flex-1 py-3">Yes</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

ScheduleInspectionDateModal.displayName = "ScheduleInspectionDateModal"