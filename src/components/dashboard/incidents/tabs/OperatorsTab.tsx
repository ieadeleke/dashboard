import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import { ChevronDown, PlusIcon, SearchIcon } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs"
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FleetIcon from '@/assets/icons/ic_fleet_on_water.svg'
import PersonStandingIcon from '@/assets/icons/ic_person_standing.svg'
import { faker } from '@faker-js/faker'
import { Incident } from "@/models/incidents";
import { IncidentTable } from "../IncidentTable";
import { FilterIncidentModal, FilterIncidentModalRef, FilterIncidentOption } from "../FilterIndidentModal";

export type GeneralIncidentProps = {
    addNewVesselIncident?: () => void,
    addNewIndividualIncident?: () => void,
    addNewObjectIncident?: () => void
}

type OperatorsTabProps = GeneralIncidentProps

export default function OperatorsTab(props: OperatorsTabProps) {
    const [data, setData] = useState<Incident[]>([])
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

    useEffect(() => {
        setData(() => Array(50).fill(0).map((item) => {
            return {
                fleet_id: faker.number.int({ min: 1000, max: 9999 }).toString(),
                status: "Approved"
            }
        }))
    }, [])

    return (
        <div className="flex flex-col">
            <FilterIncidentModal ref={filterIncidentRef} />
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">Operators Incidents <span className="text-primary">(50)</span></h1>

                <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
                    <TextField.Container className="flex-1 border border-gray-200">
                        <TextField.Input placeholder="Search" />

                        <IconButton className="text-gray-200">
                            <SearchIcon />
                        </IconButton>
                    </TextField.Container>

                    <div onClick={openFilterModal} className="flex items-center gap-3 cursor-pointer text-text-normal font-semibold border rounded-md px-2 py-3">
                        <p>Filter</p>
                        <ChevronDown className="text-gray-300" />
                    </div>

                    <Popover>
                        <PopoverTrigger>
                            <div className="cursor-pointer flex items-center gap-1 text-text-normal font-semibold border rounded-md py-4 px-2 bg-primary text-white">
                                <PlusIcon className="w-6 h-6" />
                                <p className="text-sm">Add New Incident</p>
                            </div>
                        </PopoverTrigger>

                        <PopoverContent className="flex flex-col w-auto px-2 py-1 gap-3">
                            <div onClick={props.addNewVesselIncident} className="flex items-center px-2 gap-2 cursor-pointer py-2 hover:bg-gray-100 rounded-md">
                                <FleetIcon className="text-primary" />
                                <p>Incident with Vessel</p>
                            </div>

                            <div onClick={props.addNewIndividualIncident}  className="flex items-center px-2 gap-2 cursor-pointer py-2 hover:bg-gray-100 rounded-md">
                                <PersonStandingIcon className="text-primary" />
                                <p>Incident with Individual</p>
                            </div>

                            <div onClick={props.addNewObjectIncident}  className="flex items-center px-2 gap-2 cursor-pointer py-2 hover:bg-gray-100 rounded-md">
                                <PersonStandingIcon className="text-primary" />
                                <p>Incident with Object</p>
                            </div>

                        </PopoverContent>
                    </Popover>

                </div>

                <TabsContent value="operators">
                    <IncidentTable data={data} />
                </TabsContent>
            </div>
        </div>
    )
}
