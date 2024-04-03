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
import { convertToDate } from "@/utils/data/getDefaultDate";
import { TransactionStatus, TransactionStatusChip } from "./TransactionStatusChip";
import Button from "../buttons";

type TransactionTableProps = {
  name: string;
  transactions: Transaction[];
  isLoading?: boolean;
  error?: string | null;
  fetchData?: () => void,
  dateRange?: {
    startDate: string,
    endDate: string
  },
  onDateApplied?: (date: DateRange) => void
};

export const TransactionTable = (props: TransactionTableProps) => {
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
  const { showSnackBar } = useContext(GlobalActionContext)

  const formatDateRange = useMemo(() => {
    if (!date) return "Tap to filter by date range";
    const start = moment(date.from).format("MMM D, YYYY");
    const end = moment(date.to).format("MMM D, YYYY");
    return `From ${start} - ${end}`;
  }, [JSON.stringify(date)]);

  function onNewDateApplied(date: DateRange) {
    if (date) {
      setDate((prevDate) =>
        Object.assign({}, prevDate, {
          from: date.from || new Date(),
          to: date.to || new Date(),
        })
      );
    }
    props.onDateApplied?.(date)
    setIsDateModalOpen(false);
  }

  useEffect(() => {
    // props.onDateApplied?.(date)
  }, [date])

  const today = new Date();
  const to = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );

  function showTransactionDetails(transaction: Transaction) {
    transactionDetailsRef.current?.open?.({
      data: transaction
    })
  }

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
      startDate: moment(date.from).format('yyyy-mm-dd'),
      endDate: moment(date.to).format('yyyy-mm-dd'),
    });
    downloadReport(dateRange)
  }
  return (
    <div className="flex flex-col gap-4">
      <TransactionDetails ref={transactionDetailsRef} />
      <LoadingModal isVisible={isDownloadReportLoading} />
      <div className="flex items-center">
        <h1 className="font-medium text-xl">{props.name}</h1>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Popover
            modal
            open={isDateModalOpen}
            onOpenChange={setIsDateModalOpen}
          >
            <PopoverTrigger className="flex-1">
              <div className="flex flex-1 items-center gap-4 border py-2 px-3 -mx-2">
                <p className="text-black text-start text-sm line-clamp-1 flex-1">
                  {formatDateRange}
                </p>

                <CalendarIcon className="h-8 w-8 opacity-50 text-gray-600 bg-gray-300 p-2 rounded-full" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarRange
                showOutsideDays={false}
                onNewDateApplied={onNewDateApplied}
                dateRange={{
                  from: date.from,
                  to: date.to
                }}
              />
            </PopoverContent>
          </Popover>

          <IconButton onClick={handleDownloadReport} className="text-gray-700">
            <DownloadIcon />
          </IconButton>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-primary rounded-xl">
          <TableRow>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Payment Method</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Transaction Date</TableHead>
            <TableHead className="text-white">Agency</TableHead>
            <TableHead className="text-white">Rev. Name</TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>

        {transactions.map((item) => (
          <TableBody onClick={() => showTransactionDetails(item)} key={item.AgencyName} className="bg-white cursor-pointer">
            <TableRow>
              <TableCell>{item.AgencyName}</TableCell>
              <TableCell>{item.paymentDetails? item.paymentDetails.data.auth_model : "-"}</TableCell>
              <TableCell>{item.paymentDetails ? item.paymentDetails.data.auth_model : item.amountPaid}</TableCell>
              <TableCell>
                <TransactionStatusChip status={item.paymentDetails ? item.paymentDetails.data.status as TransactionStatus : "failed"} />
              </TableCell>
              <TableCell>{moment(item.createdAt).format("MMMM D, YYYY")}</TableCell>
              <TableCell>{item.AgencyName}</TableCell>
              <TableCell>{item.RevName}</TableCell>
              <TableCell><Button className="text-xs w-24 h-8 bg-gray-800">View Details</Button></TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      {props.isLoading ? <Loading /> : props.error && <Error onRetry={props.fetchData} message={props.error} />}
    </div>
  );
};
