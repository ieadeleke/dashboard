import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { useEffect, useState } from "react";
import { FleetTableDataList } from "@/pages/fleets";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertCircleIcon, AlertTriangleIcon, ChevronDown, DownloadIcon, EditIcon, MoreHorizontalIcon, PlusIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import { Incident } from "@/models/incidents";
import { faker } from "@faker-js/faker";


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

    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">
                    <div className="flex items-center">
                        <CheckBox />
                    </div>
                </TableHead>
                <TableHead>Fleet ID</TableHead>
                <TableHead>Lorem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>

        {data.map((item) => <TableBody className="bg-white">
            <TableRow>
                <TableCell className="flex font-medium"><CheckBox /></TableCell>
                <TableCell>
                    <div className="flex items-center gap-4">
                        <p>{item.fleet_id}</p>
                    </div>
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>Lorem</TableCell>
                <TableCell>Lorem</TableCell>
                <TableCell>Lorem</TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger>
                            <IconButton className="text-primary border border-primary rounded-sm">
                                <MoreHorizontalIcon />
                            </IconButton>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto px-0 py-1">
                            <div className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-100">
                                <EditIcon className="text-gray-500" />
                                <p className="text-sm cursor-pointer">Review</p>
                            </div>

                            <div className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-100">
                                <AlertTriangleIcon className="text-red-500" />
                                <p className="text-sm cursor-pointer">Reject</p>
                            </div>

                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>
        </TableBody>)}
    </Table>
}

export default function IncidentTab(props: IncidentTabProps) {

    return (
        <div>
            <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
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

                <div className="border rounded-md py-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex items-center gap-3 text-text-normal font-semibold">
                                <p>Filter</p>
                                <ChevronDown className="text-gray-300" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Action 2</DropdownMenuItem>
                            <DropdownMenuItem>Action 3</DropdownMenuItem>
                            <DropdownMenuItem>Action 4</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <TabItem tab={props.tab} />
        </div>
    )
}
