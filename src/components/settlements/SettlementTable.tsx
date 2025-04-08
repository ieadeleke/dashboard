// import '@carbon/react/styles.css'; // ✅ This includes all necessary styles

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
import { CalendarIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CalendarRange, DateRange } from "../calendar/CalendarRange";
import moment from "moment";
import { GetAccountSettlementResponse, Settlement } from "@/models/settlements";
import Loading from "../states/Loading";
import Error from "../states/Error";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { convertDateToFormat, convertToDate } from "@/utils/data/getDefaultDate";
import { SettlementStatus, SettlementStatusChip } from "./SettlementStatusChip";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { formatDate } from "@/utils/formatters/formatDate";
import { TablePagination } from "../pagination/TablePagination";
import { SettlementDetails, SettlementDetailsRef } from "./SettlementDetail";
import { useFetchAccountSettlements } from "@/utils/apiHooks/settlements/useFetchAllSettlements";
import { DatePicker, DatePickerInput } from "@carbon/react";
import dayjs from "dayjs";



type SettlementTableProps = {
  name: string;
  routerId?: string | undefined;
  settlements: GetAccountSettlementResponse[];
  isLoading?: boolean;
  error?: string | null;
  fetchData?: () => void;
  onPageChange?: (value: { selected: number }) => void;
  page: number;
  count: number;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  onDateApplied?: (date: DateRange) => void;
};

export const SettlementTable = (props: SettlementTableProps) => {

  const {
    isLoading,
    data,
    error,
    fetchAccountSettlements,
    count: loadCount,
  } = useFetchAccountSettlements();
  const { settlements, dateRange } = props;
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<any>([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const settlementDetailsRef = useRef<SettlementDetailsRef>(null);
  const [date, setDate] = useState<DateRange>(
    dateRange
      ? {
        from: convertToDate(dateRange.startDate),
        to: convertToDate(dateRange.endDate),
      }
      : {
        from: new Date(),
        to: new Date(),
      }
  );
  const [defaultDate, setDefaultDate] = useState(dateRange ? [dateRange.startDate, dateRange.endDate] : [new Date(), new Date()]);

  const { showSnackBar } = useContext(GlobalActionContext);

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
      fetchAccountSettlements({
        from: convertDateToFormat(date.from || new Date()),
        to: convertDateToFormat(date.to || new Date()),
        account_number: props.routerId as string,
        page,
      });
      setFilterEnabled(true);
    }
    // props.onDateApplied?.(date);
    setIsDateModalOpen(false);
  }

  useEffect(() => {
    // props.onDateApplied?.(date)
  }, [date]);

  function showSettlementDetails(settlement: GetAccountSettlementResponse) {
    settlementDetailsRef.current?.open?.({
      data: settlement,
    });
  }

  useEffect(() => {
    if (settlements) {
      setPage(props.page);
      setCount(props.count);
      setFilteredTransactions(settlements);
    }
  }, [settlements]);

  useEffect(() => {
    if (error) {
      showSnackBar({
        severity: 'error',
        message: error
      })
    }
  }, [error])

  useEffect(() => {
    if (data && filterEnabled) {
      setCount(loadCount ? +loadCount : 0);
      setFilteredTransactions(data ? data : []);
    }
  }, [data])

  function onPageChange(selectedItem: {
    selected: number;
  }) {
    fetchAccountSettlements({
      from: String(date.from),
      to: String(date.to),
      account_number: props.routerId as string,
      page: selectedItem.selected + 1,
    });
    setFilterEnabled(true);
    setPage(selectedItem.selected);
  }

  const handleDateChange = (dates: any, dateStrings: any) => {
    if (dates && dates.length === 2) {
      // Convert the start and end dates to dayjs
      const startDate = dayjs(dates[0]).format('YYYY-MM-DD');
      const endDate = dayjs(dates[1]).format('YYYY-MM-DD');

      // You can store these as a range in your state or handle them further
      fetchAccountSettlements({
        from: startDate,
        to: endDate,
        account_number: props.routerId as string,
        page,
      });
      setDate({
        from: dayjs(dates[0]).toDate(),
        to: dayjs(dates[1]).toDate()
      });
      setFilterEnabled(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SettlementDetails ref={settlementDetailsRef} />
      {/* <LoadingModal isVisible={isDownloadReportLoading} /> */}
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
                  to: date.to,
                }}
              />
            </PopoverContent>
          </Popover>
          {/* <DatePicker datePickerType="range" onChange={handleDateChange} value={defaultDate}>
            <DatePickerInput id="date-picker-input-id-start" placeholder="mm/dd/yyyy" labelText="Start date" size="lg" />
            <DatePickerInput id="date-picker-input-id-finish" placeholder="mm/dd/yyyy" labelText="End date" size="lg" />
          </DatePicker> */}
          {/* <IconButton onClick={handleDownloadReport} className="text-gray-700">
              <DownloadIcon />
            </IconButton> */}
        </div>
      </div>

      <Table>
        <TableHeader className="bg-primary rounded-xl">
          <TableRow>
            <TableHead className="text-white">Amount Settled</TableHead>
            <TableHead className="text-white">Account Number</TableHead>
            <TableHead className="text-white">Bank Name</TableHead>
            <TableHead className="text-white">Settle Date</TableHead>
            <TableHead className="text-white">Service Charge</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Number of Transactions</TableHead>
            <TableHead className="text-white">Transaction Date</TableHead>
          </TableRow>
        </TableHeader>

        {filteredTransactions.map((item: any) => (
          <TableBody
            onClick={() => showSettlementDetails(item)}
            key={item._id}
            className="bg-white cursor-pointer"
          >
            <TableRow>
              <TableCell>{formatAmount(item.amountSettle)}</TableCell>
              <TableCell>{item.account_number}</TableCell>
              <TableCell>{item.bank_name}</TableCell>
              <TableCell>{formatDate(item.SettleDate)}</TableCell>
              <TableCell>{formatAmount(item.serviceCharge)}</TableCell>
              <TableCell>
                <SettlementStatusChip
                  status={item.settlementStatus ? "completed" : "pending"}
                />
              </TableCell>
              <TableCell>{item.numberOfTransaction}</TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>

      <div className="flex justify-center">
        {/* <TablePagination
          breakLabel="..."
          nextLabel=">"
          onPageChange={onPageChange}
          pageRangeDisplayed={5}
          currentPage={page - 1}
          pageCount={Math.max(0, count / 20)}
          className="flex gap-4"
          nextClassName="text-gray-500"
          previousClassName="text-gray-500"
          pageClassName="flex w-8 h-7 bg-white justify-center items-center text-sm text-gray-500 rounded-sm outline outline-2 outline-gray-100 text-center"
          activeClassName="!bg-primary text-white !outline-none"
          previousLabel="<"
          renderOnZeroPageCount={null}
        /> */}
        <TablePagination
          breakLabel="..."
          nextLabel=">"
          onPageChange={onPageChange}
          pageRangeDisplayed={5}
          currentPage={page}
          pageCount={Math.max(0, count / 20)}
          className="flex gap-4"
          nextClassName="text-gray-500"
          previousClassName="text-gray-500"
          pageClassName="flex w-8 h-7 bg-white justify-center items-center text-sm text-gray-500 rounded-sm outline outline-2 outline-gray-100 text-center"
          activeClassName="!bg-primary text-white !outline-none"
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
      {props.isLoading || isLoading ? (
        <Loading />
      ) : (
        props.error && <Error onRetry={props.fetchData} message={props.error} />
      )}
    </div>
  );
};
