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
import { Trip } from "@/utils/data/trip";
import { TripDetailModal, TripDetailModalRef } from "../trips/TripsDetail";
import { useRef } from "react";

type TripHistoryTab = {
    data: Trip[],
    onTripItemClicked?: (data: Trip) => void
}

export const TripHistoryTab = (props: TripHistoryTab) => {
    const { data } = props
    const tripDetailModalRef = useRef<TripDetailModalRef>(null)

    function handleOnTripItemClicked(data: Trip) {
        tripDetailModalRef.current?.open({ data })
    }

    return <div>
        <TripDetailModal ref={tripDetailModalRef} />
        <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
            <TextField.Container className="flex-1 border border-gray-200">
                <TextField.Input placeholder="Search" />

                <IconButton className="text-gray-200">
                    <SearchIcon />
                </IconButton>
            </TextField.Container>

            <div className="border rounded-md py-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-3 text-sm text-text-normal font-semibold">
                            <ArrowLeftRightIcon className="text-gray-300" />
                            <p>Initiate Trip</p>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => <div onClick={() => handleOnTripItemClicked(item)} key={item.id}>
                <TripHistoryItem data={item} />
            </div>)}
        </div>
    </div>
}