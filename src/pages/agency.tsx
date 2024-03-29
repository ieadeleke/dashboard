import { DateRange } from "@/components/calendar/CalendarRange";
import DashboardLayout from "@/components/layout/dashboard";
import { OverviewItem } from "@/components/page_components/dashboard/Overview";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { cn } from "@/lib/utils";
import { Transaction } from "@/models/transactions";
import { useFetchGroupTranscations } from "@/utils/apiHooks/transactions/useFetchGroupTransactions";
import { useFetchTransactionsByAgency } from "@/utils/apiHooks/transactions/useFetchTransactionsByAgency";
import { getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";


type AgentsTable = {
  AgencyName: string,
  data?: Transaction[],
  dateRange?: {
    startDate: string,
    endDate: string
  },
}

const AgentsTable = (props: AgentsTable) => {
  const [transactions, setTransactions] = useState(props.data ?? [])
  const { fetchTransactionsByAgency, isLoading, error, data } = useFetchTransactionsByAgency()
  const [date, setDate] = useState(getDefaultDateAsString())

  useEffect(() => {
    setTransactions(data)
  }, [JSON.stringify(data)])

  function fetchData() {
    fetchTransactionsByAgency({
      ...date,
      AgencyName: props.AgencyName
    });
  }

  useEffect(() => {
    fetchData()
  }, [date, props.AgencyName]);

  function onDateApplied(date: DateRange) {
    setDate({
      startDate: moment(date.from).format('yyyy-mm-dd'),
      endDate: moment(date.to).format('yyyy-mm-dd'),
    });
  }

  return <div>
    <TransactionTable
      onDateApplied={onDateApplied}
      name={`Recent Transactions for ${props.AgencyName}`}
      transactions={transactions}
      isLoading={isLoading}
      error={error}
      dateRange={props.dateRange}
      fetchData={fetchData}
    />
  </div>
}

export default function Agents() {
  const {
    isLoading,
    data: groups,
    error,
    fetchGroupTransactions,
  } = useFetchGroupTranscations();
  const [selectedTab, setSelectedTab] = useState<string>("LASWA");
  const [date, setDate] = useState(getDefaultDateAsString())

  function fetchData() {
    fetchGroupTransactions(date);
  }

  useEffect(() => {
    fetchData()
  }, [date]);

  useEffect(() => {
    if (groups.length > 0) {
      setSelectedTab(groups[0]._id);
    }
  }, [groups]);

  const transactions = useMemo(() => {
    if (groups.length > 0) {
      return (
        groups.find((group) => group._id == selectedTab)?.transactions ?? []
      );
    } else return [];
  }, [groups.length, selectedTab]);

  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <h1 className="font-medium text-2xl">Agency</h1>
        <NetworkRequestContainer isLoading={isLoading} error={error} onRetry={fetchData}>
          <div>
            <div className="grid grid-cols-4 gap-4">
              {groups.map((group) => (
                <div
                  onClick={() => setSelectedTab(group._id)}
                  className={cn(
                    " rounded-lg cursor-pointer",
                    group._id == selectedTab ? `bg-gray-200` : `bg-white`
                  )}
                >
                  <OverviewItem
                    key={group._id}
                    title={group._id}
                    description={group.totalAmountPaid.toString()}
                    iconClassName="text-blue-800 bg-blue-300"
                  />
                </div>
              ))}
            </div>
            {isLoading || <div className="mt-4">
              <AgentsTable AgencyName={selectedTab} dateRange={date} />
            </div>}
          </div>
        </NetworkRequestContainer>
      </div>
    </DashboardLayout>
  );
}
