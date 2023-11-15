import { Incident } from "@/models/incidents"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertTriangleIcon, EditIcon, MoreHorizontalIcon } from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";

type IncidentTableProps = {
    data: Incident[]
}

export const IncidentTable = (props: IncidentTableProps) => {
    const { data } = props

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

        {data.map((item) => <TableBody key={item.fleet_id} className="bg-white">
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
