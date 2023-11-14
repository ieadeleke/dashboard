import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import { ChevronDown, DownloadIcon, PlusIcon, SearchIcon, UploadIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Fleet } from "@/models/fleets";
import { FleetTableDataList } from "@/pages/fleets";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import IncidentTab from "../IncidentTab";


type OtherIncidentsProps = {
    addNewIncident?: () => void
}

const tabs = [
    {
        name: "Active",
        value: "active"
    },
    {
        name: "Approved",
        value: "approved"
    },
    {
        name: "Rejected",
        value: "rejected"
    },
    {
        name: "All",
        value: "all"
    }
]

export default function OtherIncidents(props: OtherIncidentsProps) {
    const [data, setData] = useState<Fleet[]>([])

    useEffect(() => {
        // setData(fleets)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Other Incidents <span className="text-primary">(50)</span></h1>

                <Tabs defaultValue="active" className="flex flex-col py-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex">
                            <TabsList className="bg-white h-auto py-0 px-0">
                                {tabs.map((item) => <div className={``} key={item.value}>
                                    <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
                                </div>)}
                            </TabsList>
                        </div>

                        <TabsContent value="active">
                            <IncidentTab tab="active" addNewIncident={props.addNewIncident} />
                        </TabsContent>
                    </div>


                    <TabsContent value="approved">
                        <IncidentTab tab="approved" addNewIncident={props.addNewIncident} />
                    </TabsContent>

                    <TabsContent value="rejected">
                        <IncidentTab tab="rejected" addNewIncident={props.addNewIncident} />
                    </TabsContent>

                    <TabsContent value="all">
                        <IncidentTab tab="all" addNewIncident={props.addNewIncident} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
