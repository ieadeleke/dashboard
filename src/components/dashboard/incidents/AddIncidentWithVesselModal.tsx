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
import { CalendarIcon } from "lucide-react"
import moment from "moment"
import { useReducer } from "react"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import Button from "../../buttons"
import { InputProps, TextAreaProps, TextField } from "../../input/InputText"

type AddIncidentWithVesselModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

export type AddIncidentWithVesselModalRef = {
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

type FormState = {
    accident_location: string,
    boat_name: string,
    boat_type?: string,
    no_of_passengers_onboard?: number,
    no_of_passengers_rescued?: number,
    no_of_passengers_missing?: number,
    no_of_injured_passengers?: number,
    cause_of_accident: string,
    comments: string
}

type FormAction = Partial<FormState>

const default_state: FormState = {
    boat_name: "",
    boat_type: "",
    accident_location: "",
    cause_of_accident: "",
    comments: ""
}

function reducer(state: FormState, action: FormAction) {
    return Object.assign({}, state, action)
}

export const AddIncidentWithVesselModal = forwardRef<AddIncidentWithVesselModalRef, AddIncidentWithVesselModalProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, default_state)

    const { showSnackBar } = useContext(GlobalActionContext)
    const [isVisible, setIsVisible] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [timeOfDay, setTimeOfDay] = useState<"am" | "pm">("am")

    function closeModal() {
        setIsVisible(false)
    }

    function onBoatNameChanged(event: ChangeEvent<HTMLInputElement>) {
        dispatch({ boat_name: event.target.value })
    }

    function onBoatTypeChanged(event: ChangeEvent<HTMLInputElement>) {
        dispatch({ boat_type: event.target.value })
    }

    function onCauseOfAccidentChanged(event: ChangeEvent<HTMLInputElement>) {
        dispatch({ cause_of_accident: event.target.value })
    }

    function onCommentsChanged(event: ChangeEvent<HTMLInputElement>) {
        dispatch({ comments: event.target.value })
    }

    function onNumberOfInjuredPassesngersChanged(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        dispatch({ no_of_injured_passengers: isNaN(value) ? 0 : Math.min(value, 100) })
    }

    function onNumberOfPassesngersOnboardChanged(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        dispatch({ no_of_passengers_onboard: isNaN(value) ? 0 : Math.min(value, 100) })
    }

    function onNumberOfPassesngersMissingChanged(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        dispatch({ no_of_passengers_missing: isNaN(value) ? 0 : Math.min(value, 100) })
    }

    function onNumberOfPassesngersRescuedChanged(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        dispatch({ no_of_passengers_rescued: isNaN(value) ? 0 : Math.min(value, 100) })
    }

    function oAccidentLocationChanged(event: ChangeEvent<HTMLInputElement>) {
        dispatch({ accident_location: event.target.value })
    }

    function submit() {

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
                <h2 className="font-semibold text-2xl text-center">Add Incident With Vessel</h2>
            </div>

            <Divider />

            <div className="flex flex-col gap-6">

                <div className="flex flex-col gap-0">
                    <Popover modal open={isDateModalOpen} onOpenChange={setIsDateModalOpen}>
                        <PopoverTrigger className="flex-1">
                            <div className="flex flex-1 items-center gap-4 border py-2 px-3 -mx-2">
                                <p className="text-black text-start text-sm line-clamp-1 flex-1">{moment(date).format("DD/MM/YYYY")}</p>

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
                    <h4 className="text-sm font-medium">Enter Time</h4>
                    <div className={`border border-gray-100 p-2`}>
                        <div className="flex gap-2">
                            <div>
                                <input inputMode="numeric" maxLength={2} placeholder="00" className="border p-2 w-12 text-center" />
                                <p className="text-xs">Hour</p>
                            </div>

                            <h1 className="text-lg font-bold mt-2">:</h1>

                            <div >
                                <input inputMode="numeric" maxLength={2} placeholder="00" className="border p-2 w-12 text-center" />
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
                    <h4 className="text-sm font-medium">Accident Location</h4>
                    <AdminInputField onChange={oAccidentLocationChanged} value={state.accident_location} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Boat Name</h4>
                    <AdminInputField onChange={onBoatNameChanged} value={state.boat_name} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Boat Type (Optional)</h4>
                    <AdminInputField onChange={onBoatTypeChanged} value={state.boat_type} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Number of Passengers onboard</h4>
                    <AdminInputField inputMode="numeric" value={state.no_of_passengers_onboard} onChange={onNumberOfPassesngersOnboardChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Number of Passengers rescued</h4>
                    <AdminInputField inputMode="numeric" value={state.no_of_passengers_rescued} onChange={onNumberOfPassesngersRescuedChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Number of Passengers missing</h4>
                    <AdminInputField inputMode="numeric" value={state.no_of_passengers_missing} onChange={onNumberOfPassesngersMissingChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Number of Injured Passengers</h4>
                    <AdminInputField inputMode="numeric" value={state.no_of_injured_passengers} onChange={onNumberOfInjuredPassesngersChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Cause of Accident</h4>
                    <AdminInputField value={state.cause_of_accident} onChange={onCauseOfAccidentChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Comments</h4>
                    <AdminInputField renderInputType="text-area" />
                </div>

                <div className="flex gap-8">
                    <Button onClick={closeModal} variant="outlined" className="flex-1 py-3 bg-gray-100">No</Button>

                    <Button onClick={submit} variant="contained" className="flex-1 py-3">Yes</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

AddIncidentWithVesselModal.displayName = "AddIncidentWithVesselModal"