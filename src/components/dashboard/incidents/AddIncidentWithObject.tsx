import { CheckBox } from "@/components/buttons/CheckBox"
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
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import { z } from "zod"
import Button from "../../buttons"
import { InputProps, TextAreaProps, TextField } from "../../input/InputText"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

const schema = z
    .object({
        date: z.string({ required_error: "Invalid date" }).regex(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid date"),
        gender: z.boolean(),
        rescued: z.boolean(),
        missing: z.boolean(),
        injury: z.boolean(),
        death: z.boolean(),
        accident_location: z.string({ required_error: "Insert a valid location" }).min(3, "Location must be at least 3 characters").max(500),
        object_type: z.string({ required_error: "Insert a valid object type" }).min(3, "Location must be at least 3 characters"),
        possible_cause: z.string({ required_error: "Insert a valid possible cause" }).min(3, "Possible cause must be at least 3 characters"),
        accident_cause: z.string({ required_error: "Insert a valid accident cause" }).min(3, "Accident cause must be at least 3 characters"),
        no_of_casualties: z.number({ required_error: "Number of casualties must be at least 0" }).min(0, "Number of casualties must be at least 0"),
    }).required();



type AddIncidentWithObjectModalProps = {
    onNewFleetAdded?: (fleet: Fleet) => void,
}

export type AddIncidentWithObjectModalRef = {
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
    date: string,
    accident_location: string,
    object_type?: string,
    gender: boolean,
    rescued: boolean,
    missing: boolean,
    injury: boolean,
    death: boolean,
    no_of_casualties?: number,
    possible_cause?: string,
    accident_cause?: string
}

type FormAction = Partial<FormState>

const default_state: FormState = {
    gender: false,
    injury: false,
    missing: false,
    rescued: false,
    death: false,
    date: "",
    no_of_casualties: 0,
    accident_location: ""
}

function reducer(state: FormState, action: FormAction) {
    return Object.assign({}, state, action)
}

export const AddIncidentWithObjectModal = forwardRef<AddIncidentWithObjectModalRef, AddIncidentWithObjectModalProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, default_state)

    const { showSnackBar } = useContext(GlobalActionContext)
    const [isVisible, setIsVisible] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [timeOfDay, setTimeOfDay] = useState<"am" | "pm">("am")

    useEffect(() => {
        dispatch({ date: moment(date).format("DD/MM/YYYY") })
    }, [date])

    function closeModal() {
        setIsVisible(false)
    }

    function onPossibleCauseChanged(value: string) {
        dispatch({ possible_cause: value })
    }

    function onNumberOfCasualties(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        dispatch({ no_of_casualties: isNaN(value) ? 0 : value })
    }

    function toggleMaleGender() {
        dispatch({ gender: true })
    }

    function toggleFemaleGender() {
        dispatch({ gender: false })
    }

    function toggleInjury(value: boolean) {
        dispatch({ injury: value })
    }

    function toggleMissing(value: boolean) {
        dispatch({ missing: value })
    }

    function onObjectTypeChanged(event: ChangeEvent<HTMLInputElement>) {
        dispatch({ object_type: event.target.value })
    }

    function toggleDeath(value: boolean) {
        dispatch({ death: value })
    }

    function toggleRescued(value: boolean) {
        dispatch({ rescued: value })
    }

    function onCauseOfAccidentChanged(value: string) {
        dispatch({ accident_cause: value })
    }

    function oAccidentLocationChanged(event: ChangeEvent<HTMLInputElement>) {
        dispatch({ accident_location: event.target.value })
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

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-semibold text-2xl text-center">Add Incident With Object</h2>
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
                    <h4 className="text-sm font-medium">Accident Location</h4>
                    <AdminInputField onChange={oAccidentLocationChanged} value={state.accident_location} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Object Type</h4>
                    <AdminInputField onChange={onObjectTypeChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Number of Casualties</h4>
                    <AdminInputField inputMode="numeric" value={state.no_of_casualties} onChange={onNumberOfCasualties} />
                </div>

                <div className="p-2 flex flex-col gap-2 bg-gray-100">
                    <h4 className="text-sm font-medium">Rescued</h4>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <p className="text-sm">No</p>
                            <CheckBox isChecked={!state.rescued} onValueChange={() => toggleRescued(false)} checkIconClassName="w-2 h-2" />
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-sm">Yes</p>
                            <CheckBox isChecked={state.rescued} onValueChange={() => toggleRescued(true)}  checkIconClassName="w-2 h-2" />
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-2 flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Gender</h4>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <p className="text-sm">Male</p>
                            <CheckBox onValueChange={(value) => toggleMaleGender()} isChecked={state.gender} checkIconClassName="w-2 h-2" />
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-sm">Female</p>
                            <CheckBox onValueChange={(value) => toggleFemaleGender()} isChecked={!state.gender} checkIconClassName="w-2 h-2" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="border rounded-lg p-2 flex flex-col gap-2">
                            <h4 className="text-sm font-medium">Missing?</h4>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm">No</p>
                                    <CheckBox isChecked={!state.missing} onValueChange={() => toggleMissing(false)} checkIconClassName="w-2 h-2" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="text-sm">Yes</p>
                                    <CheckBox isChecked={state.missing} onValueChange={() => toggleMissing(true)} checkIconClassName="w-2 h-2" />
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-2 flex flex-col gap-2">
                            <h4 className="text-sm font-medium">Injury?</h4>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm">No</p>
                                    <CheckBox isChecked={!state.injury} onValueChange={() => toggleInjury(false)} checkIconClassName="w-2 h-2" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="text-sm">Yes</p>
                                    <CheckBox isChecked={state.injury} onValueChange={() => toggleInjury(true)} checkIconClassName="w-2 h-2" />
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-2 flex flex-col gap-2">
                            <h4 className="text-sm font-medium">Death?</h4>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm">No</p>
                                    <CheckBox isChecked={!state.death} onValueChange={() => toggleDeath(false)} checkIconClassName="w-2 h-2" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="text-sm">Yes</p>
                                    <CheckBox isChecked={state.death} onValueChange={() => toggleDeath(true)} checkIconClassName="w-2 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <h4 className="text-sm font-medium">Possible Cause</h4>

                            <Select onValueChange={onPossibleCauseChanged}>
                                <SelectTrigger className="flex items-center border rounded-lg h-10 w-full">
                                    <p className="text-gray-500">{state.possible_cause}</p>
                                    <ChevronDown className="text-gray-500" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='fire'>Fire</SelectItem>
                                    <SelectItem value='water'>Water</SelectItem>
                                    <SelectItem value='earth'>Earth</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1">
                            <h4 className="text-sm font-medium">Accident Cause</h4>

                            <Select onValueChange={onCauseOfAccidentChanged}>
                                <SelectTrigger className="flex items-center border rounded-lg h-10 w-full">
                                    <p className="text-gray-500">{state.accident_cause}</p>
                                    <ChevronDown className="text-gray-500" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='fire'>Fire</SelectItem>
                                    <SelectItem value='water'>Water</SelectItem>
                                    <SelectItem value='earth'>Earth</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    <Button onClick={closeModal} variant="outlined" className="flex-1 py-3 bg-gray-100">No</Button>

                    <Button onClick={submit} variant="contained" className="flex-1 py-3">Yes</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

AddIncidentWithObjectModal.displayName = "AddIncidentWithObjectModal"