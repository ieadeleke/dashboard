import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import { ArrowLeftRightIcon, ChevronDown, SearchIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TripHistoryItem } from "@/components/dashboard/trip-history/TripHistoryItem";
import { TripDetailModal, TripDetailModalRef } from "../trips/TripsDetail";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Trip } from "@/models/trips";
import { useFetchTrips } from "@/utils/apiHooks/trips/useFetchTrips";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";
import { TripStatus } from "@/utils/data/trip";
import ReactPaginate from "react-paginate";
import { TablePagination } from "@/components/pagination/TablePagination";

type TripHistoryTab = {
    onSizeUpdated?: (size: number) => void,
    onInitiateTrip?: () => void,
    type?: TripStatus,
    onTripItemClicked?: (data: Trip) => void
}

export const TripHistoryTab = (props: TripHistoryTab) => {
    const { type } = props
    const [page, setPage] = useState(0)
    const [searchPhrase, setSearchPhrase] = useState('')
    const { isLoading, data, fetchActiveTrips, fetchAllTrips, fetchCancelledTrips, fetchCompleteTrips, error } = useFetchTrips()

    const tripDetailModalRef = useRef<TripDetailModalRef>(null)

    function handleOnTripItemClicked(data: Trip) {
        tripDetailModalRef.current?.open({ data })
    }

    function onPhraseChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearchPhrase(event.target.value)
    }

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
        // alert(selectedItem.selected)
    }

    useEffect(() => {
        props.onSizeUpdated?.(data.length)
    }, [data.length])

    useEffect(() => {
        switch (type) {
            case 'active':
                fetchActiveTrips({ page })
                break;
            case 'canceled':
                fetchCancelledTrips({ page })
                break;
            case 'complete':
                fetchCompleteTrips({ page })
                break;
            default:
                fetchAllTrips({ page })
        }
    }, [type, page])

    const trips = useMemo(() => {
        const phrase = searchPhrase.trim().toLowerCase()
        if (phrase.length == 0) {
            return data
        }
        return data.filter((trip) => trip.tripOrigin.trim().toLowerCase().includes(phrase) || trip.tripDestination.trim().toLowerCase().includes(phrase))
    }, [searchPhrase, JSON.stringify(data)])

    return <div className="flex flex-col gap-8">
        <TripDetailModal ref={tripDetailModalRef} />
        <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
            <TextField.Container className="flex-1 border border-gray-200">
                <TextField.Input onChange={onPhraseChanged} placeholder="Search" />

                <IconButton className="text-gray-200">
                    <SearchIcon />
                </IconButton>
            </TextField.Container>

            <div className="border rounded-md px-2 pr-3 py-2">
                <div onClick={props.onInitiateTrip} className="flex items-center gap-3 cursor-pointer text-sm text-text-normal font-semibold">
                    <ArrowLeftRightIcon className="text-gray-300" />
                    <p>Initiate Trip</p>
                </div>
            </div>

            <div className="border rounded-md py-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-3 text-text-normal font-semibold">
                            <p>Filter</p>
                            <ChevronDown className="text-gray-300" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Action 1</DropdownMenuLabel>
                        <DropdownMenuItem>Action 2</DropdownMenuItem>
                        <DropdownMenuItem>Action 3</DropdownMenuItem>
                        <DropdownMenuItem>Action 4</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="min-h-[400px]">
            <NetworkRequestContainer isLoading={isLoading} error={error}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {trips.map((trip) => <div onClick={() => handleOnTripItemClicked(trip)} key={trip._id}>
                        <TripHistoryItem data={trip} />
                    </div>)}
                </div>
            </NetworkRequestContainer>

        </div>


        <div className="flex justify-center">
            <TablePagination
                breakLabel="..."
                nextLabel=">"
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                currentPage={page}
                pageCount={50}
                className="flex gap-4"
                nextClassName="text-gray-500"
                previousClassName="text-gray-500"
                pageClassName="flex w-8 h-7 bg-white justify-center items-center text-sm text-gray-500 rounded-sm outline outline-2 outline-gray-100 text-center"
                activeClassName="!bg-primary text-white !outline-none"
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    </div>
}