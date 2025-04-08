import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import Loading from "../states/Loading";
import Error from "../states/Error";
import { LoadingModal } from "../states/LoadingModal";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import Button from "../buttons";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { formatDate } from "@/utils/formatters/formatDate";
import { TablePagination } from "../pagination/TablePagination";
import { AllMDAsType } from "@/models/mdas";
import Link from "next/link";
import { AllAgentType } from "@/models/agents";

type WalletType = {
    accountName: string;
    accountNumber: string;
    bankName: string;
    phoneNumber: string;
    email: string;
    tier: string;
    type: string;
    maxBalance: number;
    dailyTransactionLimit: number;
}

type AgentTableProps = {
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    mdaList: AllAgentType[];
    isLoading?: boolean;
    error?: string | null;
    fetchData?: () => void,
    onPageChange?: (value: {
        selected: number;
    }) => void,
    page: number,
    count: number,
    handleClick: (e: any) => void
};

export const AgentTableList = (props: AgentTableProps) => {
    const { mdaList } = props;
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const { showSnackBar } = useContext(GlobalActionContext);

    const handleClick = (e: any) => {
        props.handleClick(e);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-xl">{props.name}</h1>
                <div>
                    <Link className="bg-primary px-4 py-4 text-white rounded-lg" href="/agents/new">Add New Agent</Link>
                </div>
            </div>

            <Table>
                <TableHeader className="bg-primary rounded-xl">
                    <TableRow>
                        <TableHead className="text-white">Date Added</TableHead>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Consultant</TableHead>
                        <TableHead className="text-white">Email Address</TableHead>
                        <TableHead className="text-white">Phone Number</TableHead>
                        <TableHead className="text-white">Verified</TableHead>
                        <TableHead className="text-white"></TableHead>
                    </TableRow>
                </TableHeader>

                {mdaList.map((item, index) => (
                    <TableBody key={index} className="bg-white cursor-pointer">
                        <TableRow>
                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                            <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                            <TableCell>{item?.ConsultantCompany?.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{item?.wallet?.accountName ? <div className="w-3 h-3 rounded-full bg-[#00ff00]"></div> : <div className="w-3 h-3 rounded-full bg-[#ff0000]"></div>}</TableCell>
                            <TableCell><Button onClick={() => handleClick(item)} className="text-xs w-24 h-8 bg-gray-800">View Details</Button></TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>

            <div className="flex justify-center">
                <TablePagination
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={props.onPageChange}
                    pageRangeDisplayed={5}
                    currentPage={props.page}
                    pageCount={Math.max(0, props.count / 20)}
                    // pageCount={1}
                    className="flex gap-4"
                    nextClassName="text-gray-500"
                    previousClassName="text-gray-500"
                    pageClassName="flex w-8 h-7 bg-white justify-center items-center text-sm text-gray-500 rounded-sm outline outline-2 outline-gray-100 text-center"
                    activeClassName="!bg-primary text-white !outline-none"
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
            {props.isLoading ? <Loading /> : props.error && <Error onRetry={props.fetchData} message={props.error} />}
        </div>
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}