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


type AgentTableProps = {
    walletId?: string
};

type AgentTransactionTableProps = {
    createdAt: string;
    amount: string;
    category: string;
    type: string;
    status: string;
    balance_after: string;
    balance_before: string;
    total: string;
}[]

export const AgentWalletTransactionList = ({ walletId }: AgentTableProps) => {
    const { fetchAgentWalletTrans, isLoading, error, data } = useFetchAgentWalletTrans();
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState<number>(0);
    const [transData, setTransData] = useState<AgentTransactionTableProps>([{
        createdAt: "",
        amount: "",
        category: "",
        type: "",
        status: "",
        balance_after: "",
        balance_before: "",
        total: "",
    }]);

    const { showSnackBar } = useContext(GlobalActionContext);

    const handleClick = (e: any) => {
        // props.handleClick(e);
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
            setTransData(data.Transactions);
            setCount(data.count)
        }
    }, [data])

    useEffect(() => {
        if (walletId) {
            fetchAgentWalletTrans({
                walletId,
                page: page + 1
            });
        }
    }, [walletId, page])

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                {/* <h1 className="font-medium text-xl">{props.name}</h1> */}
            </div>
            {
                isLoading ?
                    <Spin spinning={isLoading} />
                    :
                    <>
                        <Table>
                            <TableHeader className="bg-primary rounded-xl">
                                <TableRow>
                                    <TableHead className="text-white">Date Added</TableHead>
                                    <TableHead className="text-white">Amount</TableHead>
                                    <TableHead className="text-white">Balance Before</TableHead>
                                    <TableHead className="text-white">Balance After</TableHead>
                                    <TableHead className="text-white">Category</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-white">Type</TableHead>
                                </TableRow>
                            </TableHeader>

                            {transData.map((item, index) => (
                                <TableBody key={index} className="bg-white cursor-pointer">
                                    <TableRow>
                                        <TableCell>{item.createdAt}</TableCell>
                                        <TableCell>{formatAmount(item.amount)}</TableCell>
                                        <TableCell>{formatAmount(item.balance_before)}</TableCell>
                                        <TableCell>{formatAmount(item.balance_after)}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>
                                            <TransactionStatusChip status={item.status as TransactionStatus} />
                                        </TableCell>
                                        <TableCell>
                                            {
                                                item.type === "DEBIT" ?
                                                    <div className="bg-red-200 px-4 py-1 rounded-md">
                                                        <h4 className="text-red-900">{item.type}</h4>
                                                    </div>
                                                    :
                                                    <div className="bg-pattens-blue-100 px-4 py-1 rounded-md">
                                                        <h4 className="text-pattens-blue-950">{item.type}</h4>
                                                    </div>
                                            }
                                        </TableCell>
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
        </div>
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}