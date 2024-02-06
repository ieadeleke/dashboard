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
import { CalendarIcon, DownloadIcon, FilterIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CalendarRange, DateRange } from "../calendar/CalendarRange";
import moment from "moment";
import { Transaction } from "@/models/transactions";

type TransactionTableProps = {
  name: string;
  transactions: Transaction[];
  onDateApplied?: (date: DateRange) => void
};

export const TransactionTable = (props: TransactionTableProps) => {
  const { transactions } = props;
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

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
    setIsDateModalOpen(false);
  }

  useEffect(() => {
    props.onDateApplied?.(date)
  }, [date])

  const today = new Date();
  const to = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );

  return (
    <div className="flex flex-col gap-4">
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
                disabled={{
                  from: new Date(1970, 9, 1),
                  to,
                }}
                showOutsideDays={false}
                onNewDateApplied={onNewDateApplied}
              />
            </PopoverContent>
          </Popover>

          <IconButton className="text-gray-700">
            <DownloadIcon />
          </IconButton>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-primary rounded-xl">
          <TableRow>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Payment ID</TableHead>
            <TableHead className="text-white">LGA (kg)</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Transaction Date</TableHead>
            <TableHead className="text-white">Agent Name</TableHead>
            <TableHead className="text-white">Lorem Ipsum</TableHead>
          </TableRow>
        </TableHeader>

        {transactions.map((item) => (
          <TableBody key={item.AgencyName} className="bg-white">
            <TableRow>
              <TableCell>{item.AgencyName}</TableCell>
              <TableCell>{item.paymentDetails.data.id}</TableCell>
              <TableCell>{item.OraAgencyRev}</TableCell>
              <TableCell>{item.paymentDetails.status}</TableCell>
              <TableCell>{moment(item.createdAt).fromNow()}</TableCell>
              <TableCell>{item.PayerName}</TableCell>
              <TableCell>Test 3</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};
