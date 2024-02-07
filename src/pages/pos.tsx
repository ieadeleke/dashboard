import { DateRange } from "@/components/calendar/CalendarRange";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useFetchTransactionsByReference } from "@/utils/apiHooks/transactions/useFetchTransactionsByReference";
import { SearchIcon } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function POS() {
  const [searchWord, setSearchWord] = useState("");
  const [terminalId, setTerminalID] = useState("");

  const {
    isLoading,
    error,
    fetchTransactionsByReference,
    data: transactions,
  } = useFetchTransactionsByReference();

  function onSubmit() {
    setTerminalID(searchWord);
  }

  useEffect(() => {
    if (terminalId.trim().length > 0) {
      fetchTransactionsByReference({ reference: terminalId });
    }
  }, [terminalId]);

  function onDateApplied(date: DateRange) {
    if (terminalId.trim().length > 0) {
      fetchTransactionsByReference({
        reference: terminalId,
        startDate: moment(date.from).format("yyyy-mm-dd"),
        endDate: moment(date.to).format("yyyy-mm-dd"),
      });
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit();
          }}
        >
          <TextField.Container className="bg-gray-200">
            <SearchIcon />
            <TextField.Input
              defaultValue={searchWord}
              onChange={(evt) => setSearchWord(evt.target.value)}
              placeholder="Search by terminal ID"
            />
          </TextField.Container>
        </form>

        <div>
          {terminalId.trim().length > 0 && (
            <TransactionTable
              transactions={transactions}
              onDateApplied={onDateApplied}
              name={`Showing recent Transactions for "${terminalId}"`}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
