import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { Passenger } from "@/utils/data/passengers"
import { IconButton } from "@/components/buttons/IconButton";

type PassengerTableDataListProps = {
    data: Passenger
}

export const PassengerTableDataList = (props: PassengerTableDataListProps) => {
    const { data } = props


    return <TableBody className="bg-white">
        <TableRow>
            <TableCell className="flex font-medium"><CheckBox /></TableCell>
            <TableCell>
                <div className="flex items-center gap-4">
                    <img className="bg-gray-200 h-10 w-10" src={data.image} alt={data.name} />
                    <p>{data.name}</p>
                </div>
            </TableCell>
            <TableCell>{data.seats}</TableCell>
            <TableCell className="flex">
                Lorem
            </TableCell>
            <TableCell>Lorem</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <IconButton className="text-primary border border-primary rounded-sm">
                            <MoreHorizontalIcon />
                        </IconButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Action 1</DropdownMenuLabel>
                        <DropdownMenuItem>Action 2</DropdownMenuItem>
                        <DropdownMenuItem>Action 3</DropdownMenuItem>
                        <DropdownMenuItem>Action 4</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    </TableBody>
}