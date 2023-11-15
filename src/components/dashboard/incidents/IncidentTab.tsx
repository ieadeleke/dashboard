import { useEffect, useRef, useState } from "react";
import { ChevronDown, DownloadIcon, PlusIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import { Incident } from "@/models/incidents";
import { faker } from "@faker-js/faker";
import { FilterIncidentModal, FilterIncidentModalRef, FilterIncidentOption } from "./FilterIndidentModal";
import { IncidentTable } from "./IncidentTable";


type OtherIncidentTabNames = "active" | "approved" | "rejected" | "all"

type IncidentTabProps = {
    tab: OtherIncidentTabNames,
    addNewIncident?: () => void
}

type TabItemProps = {
    tab: OtherIncidentTabNames
}

const TabItem = (props: TabItemProps) => {
    const [data, setData] = useState<Incident[]>([])

    useEffect(() => {
        setData(() => Array(50).fill(0).map((item) => {
            return {
                fleet_id: faker.number.int({ min: 1000, max: 9999 }).toString(),
                status: "Approved"
            }
        }))
    }, [])

    return <IncidentTable data={data} />
}

export default function IncidentTab(props: IncidentTabProps) {
    const filterIncidentRef = useRef<FilterIncidentModalRef>(null)
    const [filterOption, setFilterOption] = useState<FilterIncidentOption>()

    function openFilterModal() {
        filterIncidentRef.current?.open({
            selectedOption: filterOption,
            onOptionSelected: (option) => {
                setFilterOption(option)
                filterIncidentRef.current?.close()
            }
        })
    }

    return (
        <div>
            <FilterIncidentModal ref={filterIncidentRef} />
            <div className="flex flex-col items-start p-4 bg-white gap-3 md:flex-row md:items-center">
                <TextField.Container className="flex-1 border border-gray-200">
                    <TextField.Input placeholder="Search" />

                    <IconButton className="text-gray-200">
                        <SearchIcon />
                    </IconButton>
                </TextField.Container>

                <Popover>
                    <PopoverTrigger>
                        <div className="cursor-pointer flex items-center gap-1 text-text-normal font-semibold border rounded-md py-4 px-2">
                            <PlusIcon className="text-gray-500 w-4 h-4" />
                            <p className="text-sm">Add New Incident</p>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent className="flex flex-col w-auto px-2 py-1 gap-3">
                        <div onClick={props.addNewIncident} className="flex items-center px-2 gap-2 cursor-pointer py-2 hover:bg-gray-100 rounded-md">
                            <PlusIcon className="text-primary" />
                            <p>Add Single Incident</p>
                        </div>

                        <p className="text-gray-500 text-xs font-medium px-1">Add Multiple</p>

                        <div className="flex items-center px-2 gap-2 cursor-pointer py-2 hover:bg-gray-100 rounded-md">
                            <UploadIcon className="text-primary" />
                            <p>Upload (Excel Template)</p>
                        </div>

                        <div className="flex items-center px-2 gap-2 cursor-pointer py-2 hover:bg-gray-100 rounded-md">
                            <DownloadIcon className="text-primary" />
                            <p>Download Excel Template</p>
                        </div>

                    </PopoverContent>
                </Popover>

                <div onClick={openFilterModal} className="flex items-center gap-3 cursor-pointer text-text-normal font-semibold border rounded-md px-2 py-3">
                    <p>Filter</p>
                    <ChevronDown className="text-gray-300" />
                </div>
            </div>
            <TabItem tab={props.tab} />
        </div>
    )
}
