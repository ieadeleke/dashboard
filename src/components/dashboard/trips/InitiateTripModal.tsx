import { Avatar } from "@/components/image/Avatar"
import { BaseSelect, BaseSelectOption } from "@/components/select/BaseSelect"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import { GlobalActionContext } from "@/context/GlobalActionContext"
import { cn } from "@/lib/utils"
import { Fleet } from "@/models/fleets"
import { Trip } from "@/models/trips"
import { useFetchAllFleets } from "@/utils/apiHooks/fleets/useFetchAllFleets"
import { useInitiateTrip } from "@/utils/apiHooks/trips/useInitiateTrip"
import { useGetAllUsers } from "@/utils/apiHooks/users/useGetAllUsers"
import { ChangeEvent, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react"
import Button from "../../buttons"
import { InputProps, TextField } from "../../input/InputText"

type InitiateTripModalProps = {
    onNewTripInitiatedAdded?: (trip: Trip) => void,
}

export type InitiateTripModalRef = {
    open: () => void,
    close: () => void
}

const InitiateTripInputField = ({ className, ...props }: InputProps) => {
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

export const InitiateTripModal = forwardRef<InitiateTripModalRef, InitiateTripModalProps>((props, ref) => {
    const [selectedFleet, setSelectedFleet] = useState<BaseSelectOption | null>(null)
    const [tripOrigin, setTripOrigin] = useState('')
    const [tripDestination, setTripDestination] = useState('')
    const { showSnackBar } = useContext(GlobalActionContext)
    const { isLoading: fleetFetchLoading, error: fleetFetchError, data: fleets, fetchAllFleets } = useFetchAllFleets()
    const { isLoading, error, data, initiateTrip } = useInitiateTrip()
    const [isVisible, setIsVisible] = useState(false)

    const fleetOptions: BaseSelectOption[] = useMemo(() => fleets.map((item) => ({ id: item._id, label: item.model, value: item.model })), [JSON.stringify(fleets)])

    useEffect(() => {
        fetchAllFleets()
    }, [isVisible])

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: 'error', message: error })
        }
    }, [error])

    useEffect(() => {
        if (data) {
            showSnackBar({ severity: 'success', message: "New Trip Initiated" })
            props.onNewTripInitiatedAdded?.(data)
        }
    }, [data])

    function closeModal() {
        setIsVisible(false)
    }

    function submit() {
        if (selectedFleet) {
            initiateTrip({
                tripOrigin,
                tripDestination,
                boatId: selectedFleet.id
            })
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

    function onFleetSelected(option: BaseSelectOption) {
        setSelectedFleet(option)
    }

    function onTripOriginChanged(event: ChangeEvent<HTMLInputElement>) {
        setTripOrigin(event.target.value)
    }

    function onTripDestinationChanged(event: ChangeEvent<HTMLInputElement>) {
        setTripDestination(event.target.value)
    }

    return <Dialog open={isVisible} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Initiate Trip</h2>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Select Boat</h4>
                    <BaseSelect
                        isLoading={fleetFetchLoading}
                        value={selectedFleet}
                        placeholder="Search for fleets"
                        onChange={onFleetSelected}
                        options={fleetOptions}
                        formatOptionLabel={(option) => {
                            const fleet = fleets.find((item) => item._id == option.id)
                            return <div>
                                <div className="flex items-center gap-4">
                                    <p>{fleet?.model}</p>
                                </div>
                            </div>
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Trip Origin*</h4>
                    <InitiateTripInputField onChange={onTripOriginChanged} />
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Trip Destination*</h4>
                    <InitiateTripInputField onChange={onTripDestinationChanged} />
                </div>

                <div className="flex gap-8">
                    <Button onClick={closeModal} disabled={isLoading} variant="outlined" className="flex-1 py-3">Close</Button>

                    <Button onClick={submit} isLoading={isLoading} disabled={isLoading} variant="contained" className="flex-1 py-3">Initiate Trip</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>

})

InitiateTripModal.displayName = "InitiateTripModal"