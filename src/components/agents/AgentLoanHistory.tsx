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
import { formatDate, formatDateWithoutTime } from "@/utils/formatters/formatDate";
import { TablePagination } from "../pagination/TablePagination";
import { AllMDAsType } from "@/models/mdas";
import Link from "next/link";
import { AllAgentType } from "@/models/agents";
import { Input, Modal, Select, Spin } from "antd";
import { useGetAgents } from "@/utils/apiHooks/agents/useGetAgents";
import { useGetConsultants } from "@/utils/apiHooks/agents/useGetConsultants";
import { useAddConsultants } from "@/utils/apiHooks/agents/useAddConsultant";
import { useUpdateAgentConsultants } from "@/utils/apiHooks/agents/useUpdateAgentConsultant";
import { useApproveLoan } from "@/utils/apiHooks/agents/useApproveLoan";
import { useRejectLoan } from "@/utils/apiHooks/agents/useRejectLoan";
import { useGetAgentsLoanHistory } from "@/utils/apiHooks/agents/useGetLoanHistory";
import { LoadingOutlined } from '@ant-design/icons';


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
    name: string
    mdaList: any;
    isLoading?: boolean;
    error?: string | null;
    onPageChange?: (value: {
        selected: number;
    }) => void
    page: number
    count: number
};

interface ConsultantInterface {
    _id: string
    name: string
}

export const AgentLoanHistoryTable = (props: AgentTableProps) => {

    let antIcon = <LoadingOutlined spin style={{ fontSize: 30, color: '#000' }} />

    const { approveLoan, isLoading: approveLoanLoading, error: approveLoanError, data: approveLoanData } = useApproveLoan();
    const { rejectLoan, isLoading: rejectLoanLoading, error: rejectConsultantError, data: rejectLoanData } = useRejectLoan();

    const { mdaList } = props;
    const { getAgentList, isLoading, error, data } = useGetAgentsLoanHistory();

    const [page, setPage] = useState<number>(0);
    const [count, setCount] = useState<number>(1);
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [openConsultantDisplayModal, setOpenConsultantModal] = useState<boolean>(false);
    const [openNewConsultantDisplayModal, setOpenNewConsultantModal] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [selectedAgent, setSelectedAgent] = useState({
        _id: "",
        ConsultantCompany: ""
    });
    const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);
    const [pageLoaderIndicator, setPageLoaderIndicator] = useState<boolean>(false);

    const { showSnackBar } = useContext(GlobalActionContext);
    const [filteredTransactions, setFilteredTransactions] = useState<any>([]);

    function fetchData() {
        getAgentList({
            status: statusFilter
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (mdaList) {
            setCount(props.count);
            setFilteredTransactions(mdaList);
        }
    }, [mdaList])
    useEffect(() => {
        if (data && filterEnabled) {
            setCount(data.count)
            setFilteredTransactions(data.data);
        }
    }, [data])

    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: "error",
                message: error,
            });
            setPageLoaderIndicator(true);
        }
    }, [error])

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        getAgentList({
            page: selectedItem.selected + 1,
        });
        setFilterEnabled(true);
        setPage(selectedItem.selected);
    }

    const handleAgentLoanApproval = (e: string) => {
        approveLoan({ loanId: e });
        setPageLoaderIndicator(true);
    }

    const handleAgentLoanRejection = (e: string) => {
        rejectLoan({
            loanId: e,
        });
        setPageLoaderIndicator(true);
    }

    useEffect(() => {
        if (approveLoanData) {
            showSnackBar({
                severity: "success",
                message: "Loan approved successfully",
            });
            window.location.reload();
        }
    }, [approveLoanData])
    useEffect(() => {
        if (rejectLoanData) {
            showSnackBar({
                severity: "success",
                message: "Loan rejected successfully",
            });
            window.location.reload();
        }
    }, [rejectLoanData])
    useEffect(() => {
        if (approveLoanError) {
            showSnackBar({
                severity: "error",
                message: approveLoanError,
            });
            setPageLoaderIndicator(false);
        }
    }, [approveLoanError])


    useEffect(() => {
        if (rejectConsultantError) {
            showSnackBar({
                severity: "error",
                message: rejectConsultantError,
            });
            setPageLoaderIndicator(false);
        }
    }, [rejectConsultantError])

    return (
        <Spin spinning={pageLoaderIndicator} indicator={antIcon}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="font-medium text-xl">{props.name}</h1>
                    <div>
                        <div>
                            {/* <div className="flex gap-4">
                            <button onClick={toggleNewConsultantModal} className="text-primary bg-transparent border-2 border-solid border-primary px-4 py-3 text-sm rounded-lg">Add New Consultant</button>
                            <Link className="bg-primary px-4 py-4 text-white rounded-lg" href="/agents/new">Add New Agent</Link>
                        </div> */}
                        </div>
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-primary rounded-xl">
                        <TableRow>
                            <TableHead className="font-black text-white rounded-tl-xl">Date</TableHead>
                            <TableHead className="font-black text-white">Float Amount</TableHead>
                            <TableHead className="font-black text-white">Interest</TableHead>
                            <TableHead className="font-black text-white">Repayment Amount</TableHead>
                            <TableHead className="font-black text-white">End Date</TableHead>
                            <TableHead className="font-black text-white">Status</TableHead>
                            <TableHead className="font-black text-white rounded-tr-xl">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {filteredTransactions.map((item: any, index: number) => (
                        <TableBody key={index} className="bg-white cursor-pointer">
                            <TableRow>
                                <TableCell className="text-left">{formatDateWithoutTime(item.createdAt)}</TableCell>
                                <TableCell className="text-left">{formatAmount(item?.loanAmount)}</TableCell>
                                <TableCell className="text-left">{formatAmount(item?.interestAmount)}</TableCell>
                                <TableCell className="text-left">{formatAmount(item?.repaymentAmount)}</TableCell>
                                <TableCell className="text-left">{formatDateWithoutTime(item?.endDate)}</TableCell>
                                <TableCell>
                                    <p className={`py-3 px-4 w-max ${item.status === "active" ? "bg-blue-200" : item.status === "pending" ? "bg-yellow-100" : "bg-red-100"} rounded-lg text-left`}>{item.status}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {
                                            item?.status === 'pending' ?
                                                <>
                                                    <button type="button" onClick={() => handleAgentLoanApproval(item._id)} className="text-xs px-5 py-5 bg-gray-800 rounded-lg">Approve Loan</button>
                                                    <button type="button" onClick={() => handleAgentLoanRejection(item._id)} className="text-xs px-5 py-6 bg-red-800 rounded-lg">Reject Loan</button>
                                                </>
                                                : ''
                                        }
                                    </div>
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
                        // currentPage={props.page - 1}
                        // pageCount={Math.max(0, props.count / 20)}
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
            </div>
        </Spin>
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}