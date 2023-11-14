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
import { TabsContent } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Fleet } from "@/models/fleets";
import { FleetTableDataList } from "@/pages/fleets";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


type OperatorsTabProps = {
    addNewIncident?: () => void
}

export default function OperatorsTab(props: OperatorsTabProps) {
    const [data, setData] = useState<Fleet[]>([])

    useEffect(() => {
        // setData(fleets)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">Operators Incidents <span className="text-primary">(50)</span></h1>

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
                                <DropdownMenuLabel>Action 1</DropdownMenuLabel>
                                <DropdownMenuItem>Action 2</DropdownMenuItem>
                                <DropdownMenuItem>Action 3</DropdownMenuItem>
                                <DropdownMenuItem>Action 4</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <TabsContent value="operators">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    <div className="flex items-center">
                                        <CheckBox />
                                    </div>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Seats</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>

                        {data.map((item) => <FleetTableDataList key={item._id} data={item} />)}
                    </Table>
                </TabsContent>
            </div>
        </div>
    )
}
