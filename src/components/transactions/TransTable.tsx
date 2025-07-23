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
import { IconButton } from "../buttons/IconButton";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CalendarRange, DateRange } from "../calendar/CalendarRange";
import moment from "moment";
import { Transaction } from "@/models/transactions";
import Loading from "../states/Loading";
import Error from "../states/Error";
import { TransactionDetails, TransactionDetailsRef } from "./TransactionDetails";
import { useDownloadReport } from "@/utils/apiHooks/transactions/useDownloadReport";
import { LoadingModal } from "../states/LoadingModal";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { convertDateToFormat, convertToDate, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { TransactionStatus, TransactionStatusChip } from "./TransactionStatusChip";
import Button from "../buttons";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { formatDate } from "@/utils/formatters/formatDate";
import { DatePicker, DatePickerInput } from "@carbon/react";
import { TablePagination } from "../pagination/TablePagination";
import dayjs from "dayjs";
import { useFetchTranscations } from "@/utils/apiHooks/transactions/useFetchTransactions";
import { useReprocessPayment } from "@/utils/apiHooks/agents/useReprocessPayment";
import { useReversePayment } from "@/utils/apiHooks/agents/useReversePayment";
import { Dropdown, MenuProps, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';



type TransactionTableProps = {
    name: string;
    transactions: Transaction[];
    isLoading?: boolean;
    error?: string | null;
    fetchData?: () => void,
    onPageChange?: (value: {
        selected: number;
    }) => void,
    page: number,
    count: number,
    dateRange?: {
        startDate: string,
        endDate: string
    },
    onDateApplied?: (date: DateRange) => void
};

export const TransactionTable = (props: TransactionTableProps) => {
    const { transactions, dateRange } = props;
    const {
        isLoading,
        data: transactionData,
        error,
        fetchTransactions,
        count: loadCount
    } = useFetchTranscations();
    const { isLoading: isDownloadReportLoading, error: downloadReportError, downloadReport, data } = useDownloadReport();
    const { isLoading: loadingReversePaymentError, error: reversePaymentError, data: reversePaymentData, reReversePayment } = useReversePayment();
    const { isLoading: loadingReprocess, error: reprocessPaymentError, data: reprocessPaymentData, reProcessPayment } = useReprocessPayment();
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(1);
    const [filterEnabled, setFilterEnabled] = useState(false);
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null);
    const [filteredTransactions, setFilteredTransactions] = useState<any>([]);
    const [currentSelectedTransaction, setCurrentSelectedTransaction] = useState<any>({});
    const [loadPage, setLoadPage] = useState<boolean>(false);
    const [status, setStatus] = useState('');



    const [date, setDate] = useState<DateRange>(dateRange ? {
        from: convertToDate(dateRange.startDate),
        to: convertToDate(dateRange.endDate),
    } : {
        from: new Date(),
        to: new Date(),
    });
    const [defaultDate, setDefaultDate] = useState(dateRange ? [dateRange.startDate, dateRange.endDate] : [new Date(), new Date()]);

    const { showSnackBar } = useContext(GlobalActionContext)

    const formatDateRange = useMemo(() => {
        if (!date) return "Tap to filter by date range";
        const start = moment(date.from).format("MMM D, YYYY");
        const end = moment(date.to).format("MMM D, YYYY");
        return `From ${start} - ${end}`;
    }, [JSON.stringify(date)]);

    useEffect(() => {
        if (transactions) {
            setPage(props.page);
            setCount(props.count);
            setFilteredTransactions(transactions);
        }
    }, [transactions]);

    useEffect(() => {
        if (transactionData && filterEnabled) {
            setCount(loadCount ? +loadCount : 0);
            setFilteredTransactions(transactionData ? transactionData : []);
        }
    }, [transactionData])

    function onNewDateApplied(dates: any, dateStrings: any) {
        if (dates && dates.length === 2) {
            // Convert the start and end dates to dayjs
            let date = {
                from: dayjs(dates[0]).toDate(),
                to: dayjs(dates[1]).toDate()
            }
            setDate((prevDate) =>
                Object.assign({}, prevDate, {
                    from: date.from || new Date(),
                    to: date.to || new Date(),
                })
            );
            fetchTransactions({
                startDate: convertDateToFormat(date.from),
                endDate: convertDateToFormat(date.to || new Date()),
                page: page + 1,
                status
            })
            setFilterEnabled(true);
            // props.onDateApplied?.(date)
            setIsDateModalOpen(false);
        }
    }

    useEffect(() => {
        // props.onDateApplied?.(date)
    }, [date])

    function showTransactionDetails(transaction: Transaction) {
        transactionDetailsRef.current?.open?.({
            data: transaction
        })
    }

    useEffect(() => {
        if (data) {
            if (typeof data == 'string') {
                alert("Unprocessable entity")
            }
        }
    }, [data])

    useEffect(() => {
        if (downloadReportError) {
            showSnackBar({
                severity: 'error',
                message: downloadReportError
            })
        }
    }, [downloadReportError])
    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: 'error',
                message: error
            })
        }
    }, [error])

    function handleDownloadReport() {
        const dateRange = {
            startDate: convertDateToFormat(date.from),
            endDate: convertDateToFormat(date.to ?? new Date()),
        };
        downloadReport({...dateRange, status})
    }

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        fetchTransactions({
            startDate: convertDateToFormat(date.from),
            endDate: convertDateToFormat(date.to || new Date()),
            page: page + 1,
            status
        })
        setFilterEnabled(true);
        setPage(selectedItem.selected);
    }

    const handleReversePayment = () => {
        reReversePayment({
            paymentRef: currentSelectedTransaction?.paymentRef
        });
    }

    const handleReprocessPayment = () => {
        reProcessPayment({
            paymentRef: currentSelectedTransaction?.paymentRef
        });
    }

    useEffect(() => {
        if (reversePaymentData?.Wallet) {
            showSnackBar({
                severity: 'success',
                message: "Payment reversed successfully"
            })
            window.location.reload();
        }
    }, [reversePaymentData]);
    useEffect(() => {
        if (reprocessPaymentData?.data) {
            showSnackBar({
                severity: 'success',
                message: "Payment reprocessed successfully"
            })
            window.location.reload();
        }
    }, [reprocessPaymentData]);

    useEffect(() => {
        if (reprocessPaymentError) {
            showSnackBar({
                severity: 'error',
                message: reprocessPaymentError
            })
        }
    }, [reprocessPaymentError])

    useEffect(() => {
        if (reversePaymentError) {
            showSnackBar({
                severity: 'error',
                message: reversePaymentError
            })
        }
    }, [reversePaymentError])

    useEffect(() => {
        if (loadingReversePaymentError || loadingReprocess) {
            setLoadPage(true);
        } else {
            setLoadPage(false);
        }
    }, [loadingReversePaymentError, loadingReprocess])

    const handleStatusFilter = (status: string) => {
        setStatus(status);
        fetchTransactions({
            startDate: convertDateToFormat(date.from),
            endDate: convertDateToFormat(date.to || new Date()),
            page: page + 1,
            status
        })
        setFilterEnabled(true);
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <div onClick={() => handleStatusFilter('Successful')} className="py-3 px-6 text-sm">Successful</div>
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <div onClick={() => handleStatusFilter('Pending')} className="py-3 px-6 text-sm">Pending</div>
        },
        {
            key: '3',
            label: <div onClick={() => handleStatusFilter('Fail')} className="py-3 px-6 text-sm">Fail</div>
        }
    ];

    return (
        <Spin spinning={loadPage} indicator={<LoadingOutlined spin />}>
            <div className="flex flex-col gap-4">
                <TransactionDetails ref={transactionDetailsRef} reprocessPayment={handleReprocessPayment} reversePayment={handleReversePayment} />
                <LoadingModal isVisible={isDownloadReportLoading} />
                <div className="flex items-center">
                    <h1 className="font-medium text-xl">{props.name}</h1>
                    <div className="flex-1" />
                    <div className="flex items-end gap-4">
                        <Dropdown menu={{ items }} className="py-3 px-8 block border cursor-pointer border-solid border-black rounded-lg">
                            <div>
                                Filter by Status: {status}
                            </div>
                        </Dropdown>
                        <DatePicker datePickerType="range" onChange={onNewDateApplied} value={defaultDate}>
                            <DatePickerInput id="date-picker-input-id-start" placeholder="mm/dd/yyyy" labelText="Start date" size="lg" />
                            <DatePickerInput id="date-picker-input-id-finish" placeholder="mm/dd/yyyy" labelText="End date" size="lg" />
                        </DatePicker>

                        <IconButton onClick={handleDownloadReport} className="text-gray-700">
                            <DownloadIcon />
                        </IconButton>
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-primary rounded-xl">
                        <TableRow>
                            <TableHead className="text-white">Name</TableHead>
                            <TableHead className="text-white">Bill Reference</TableHead>
                            <TableHead className="text-white">Payment Method</TableHead>
                            <TableHead className="text-white">Payment Gateway</TableHead>
                            <TableHead className="text-white">Amount</TableHead>
                            <TableHead className="text-white">Status</TableHead>
                            <TableHead className="text-white">Transaction Date</TableHead>
                            <TableHead className="text-white">Agency</TableHead>
                            <TableHead className="text-white">Rev. Name</TableHead>
                            <TableHead className="text-white"></TableHead>
                        </TableRow>
                    </TableHeader>

                    {filteredTransactions.map((item: any) => (
                        <TableBody onClick={() => {
                            setCurrentSelectedTransaction(item);
                            showTransactionDetails(item);
                        }} key={item.AgencyName} className="bg-white cursor-pointer">
                            <TableRow>
                                <TableCell>{item.PayerName}</TableCell>
                                <TableCell>{item.reference}</TableCell>
                                <TableCell>{item?.paymentDetails?.data?.payment_type ? capitalizeFirstLetter(item?.paymentDetails?.data?.payment_type) : item?.paymentDetails?.data?.payments?.paymentType ? capitalizeFirstLetter(item.paymentDetails.data?.payments?.paymentType) : item?.PaymentChannel ? capitalizeFirstLetter(item?.PaymentChannel) : ''}</TableCell>
                                <TableCell>{item?.PaymentGateway ? capitalizeFirstLetter(item?.PaymentGateway) : ''}</TableCell>
                                <TableCell>{formatAmount(item.amountPaid)}</TableCell>
                                <TableCell>
                                    <TransactionStatusChip status={item.Status as TransactionStatus} />
                                </TableCell>
                                <TableCell>{formatDate(item.createdAt)}</TableCell>
                                <TableCell>{item.AgencyName}</TableCell>
                                <TableCell>{item.RevName}</TableCell>
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
                {props.isLoading || isLoading ? <Loading /> : props.error && <Error onRetry={props.fetchData} message={props.error} />}
            </div>
        </Spin>
    );
};


function capitalizeFirstLetter(value: string) {
    return value?.charAt(0)?.toUpperCase() + value?.slice(1).toLowerCase();
}