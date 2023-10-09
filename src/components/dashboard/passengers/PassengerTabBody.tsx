import { CheckBox } from "@/components/buttons/CheckBox"
import { IconButton } from "@/components/buttons/IconButton"
import { TextField } from "@/components/input/InputText"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Passenger } from "@/utils/data/passengers"
import { ChevronDown, PlusIcon, SearchIcon } from "lucide-react"
import { PassengerTableDataList } from "./PassengerTableDataList"

type PassengerTabBodyProps = {
    data: Passenger[]
}

export const PassengerTabBody = (props: PassengerTabBodyProps) => {
    const { data } = props

    return <div>
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
                            <PlusIcon className="text-gray-300" />
                            <p>Add Passengers</p>
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

        <div>
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

                {data.map((item) => <PassengerTableDataList key={item.id} data={item} />)}
            </Table>
        </div>
    </div>
}