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
import { useSuspendAgents } from "@/utils/apiHooks/agents/useSuspendAgent";
import { useFetchAgentWalletTrans } from "@/utils/apiHooks/agents/useFetchAgentWalletTrans";
import { TransactionStatus, TransactionStatusChip } from "../transactions/TransactionStatusChip";
import { Spin } from "antd";
import { useFetchAgentTrans } from "@/utils/apiHooks/agents/useFetchAgentTrans";
import { DateRange } from "../calendar/CalendarRange";
import { convertDateToFormat, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { Transaction } from "@/models/transactions";
import { TransactionDetails, TransactionDetailsRef } from "../agents/AgentTransactionDetails";


type AgentTableProps = {
    userId?: string
};

type AgentTransactionTableProps = {
    createdAt: string;
    amount: string;
    category: string;
    type: string;
    Status: string;
    balance_after: string;
    balance_before: string;
    total: string;
}[]

export const AgentTotalTransactionList = ({ userId }: AgentTableProps) => {
    const { fetchWalletTrans, isLoading, error, data } = useFetchAgentTrans();
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [date, setDate] = useState(getDefaultDateAsString())
    const [count, setCount] = useState<number>(0);
    const [transData, setTransData] = useState<Transaction[]>([]);
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null)


    const { showSnackBar } = useContext(GlobalActionContext);

    const handleClick = (e: any) => {
        // props.handleClick(e);
    }

    function onDateApplied(date: DateRange) {
        setDate({
            startDate: convertDateToFormat(date.from),
            endDate: convertDateToFormat(date.to ?? new Date()),
        });
    }

    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: "error",
                message: error,
            });
        }
    }, [error])

    useEffect(() => {
        if (data) {
            setTransData(data.Transaction);
            setCount(data.count)
        }
    }, [data])

    useEffect(() => {
        if (userId) {
            fetchWalletTrans({
                userId,
                page: page + 1,
                ...date
            });
        }
    }, [userId, page])

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }
    function showTransactionDetails(transaction: Transaction) {
        transactionDetailsRef.current?.open?.({
            data: transaction
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                {/* <h1 className="font-medium text-xl">{props.name}</h1> */}
            </div>
            <TransactionDetails ref={transactionDetailsRef} />
            {
                isLoading ?
                    <Spin spinning={isLoading} />
                    :
                    <>
                        <Table>
                            <TableHeader className="bg-primary rounded-xl">
                                <TableRow>
                                    <TableHead className="text-white">Date Added</TableHead>
                                    <TableHead className="text-white">Amount Paid</TableHead>
                                    <TableHead className="text-white">Payment Channel</TableHead>
                                    <TableHead className="text-white">Payer Name</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-white">Type</TableHead>
                                </TableRow>
                            </TableHeader>

                            {transData.map((item, index) => (
                                <TableBody onClick={() => showTransactionDetails(item)} key={index} className="bg-white cursor-pointer">
                                    <TableRow>
                                        <TableCell>{item.createdAt}</TableCell>
                                        <TableCell>{formatAmount(item.amountPaid)}</TableCell>
                                        <TableCell>{item.PaymentChannel}</TableCell>
                                        <TableCell>{capitalizeFirstLetter(item.PayerName)}</TableCell>
                                        <TableCell>
                                            <TransactionStatusChip status={item.Status as TransactionStatus} />
                                        </TableCell>
                                        <TableCell><Button className="text-xs w-24 h-8 bg-gray-800">View Details</Button></TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>

                        <div className="flex justify-center">
                            <TablePagination
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={onPageChange}
                                pageRangeDisplayed={5}
                                currentPage={page}
                                pageCount={Math.max(0, count / 20)}
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
                    </>
            }
        </div >
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}