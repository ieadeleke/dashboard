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
import Loading from "../states/Loading";
import Error from "../states/Error";
import { TransactionDetails, TransactionDetailsRef } from "./TransactionDetails";
import { useDownloadReport } from "@/utils/apiHooks/transactions/useDownloadReport";
import { LoadingModal } from "../states/LoadingModal";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { convertDateToFormat, convertToDate } from "@/utils/data/getDefaultDate";
import { TransactionStatus, TransactionStatusChip } from "./TransactionStatusChip";
import Button from "../buttons";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { formatDate } from "@/utils/formatters/formatDate";
import { DatePicker, DatePickerInput } from "@carbon/react";
import { TablePagination } from "../pagination/TablePagination";
import dayjs from "dayjs";
import { ConsultantDetails } from "./ConsultantDetails";


type TransactionTableProps = {
    name: string;
    transactions: any[];
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

export const ConsultantTable = (props: TransactionTableProps) => {
    const { transactions, dateRange } = props;
    const { isLoading: isDownloadReportLoading, error: downloadReportError, downloadReport, data } = useDownloadReport()
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null)
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
            props.onDateApplied?.(date)
            setIsDateModalOpen(false);
        }
    }

    useEffect(() => {
        // props.onDateApplied?.(date)
        // props.fetchData()
    }, [date])

    function showTransactionDetails(transaction: any) {
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

    function handleDownloadReport() {
        const dateRange = ({
            startDate: convertDateToFormat(date.from),
            endDate: convertDateToFormat(date.to ?? new Date()),
        });
        downloadReport(dateRange)
    }
    return (
        <div className="flex flex-col gap-4">
            <ConsultantDetails ref={transactionDetailsRef} />
            <LoadingModal isVisible={isDownloadReportLoading} />
            <div className="flex items-center">
                <h1 className="font-medium text-xl">{props.name}</h1>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
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
                        <TableHead className="text-white"></TableHead>
                        <TableHead className="text-white">Consultant Name</TableHead>
                        <TableHead className="text-white">Total Amount</TableHead>
                        <TableHead className="text-white">Total Company Transactions</TableHead>
                        <TableHead className="text-white"></TableHead>
                    </TableRow>
                </TableHeader>

                {transactions.map((item, index: number) => (
                    <TableBody onClick={() => showTransactionDetails(item)} key={item.AgencyName} className="bg-white cursor-pointer">
                        <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.companyName}</TableCell>
                            <TableCell>{formatAmount(item?.companyTotalAmount)}</TableCell>
                            <TableCell><div className="text-center">{item?.companyTransactionCount}</div></TableCell>
                            <TableCell><Button className="text-xs w-24 h-8 bg-gray-800">View Details</Button></TableCell>
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