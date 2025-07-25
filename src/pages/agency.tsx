import { DateRange } from "@/components/calendar/CalendarRange";
import DashboardLayout from "@/components/layout/dashboard";
import { OverviewItem } from "@/components/page_components/dashboard/Overview";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Transaction } from "@/models/transactions";
import { useFetchGroupTranscations } from "@/utils/apiHooks/transactions/useFetchGroupTransactions";
import { useFetchTransactionsByAgency } from "@/utils/apiHooks/transactions/useFetchTransactionsByAgency";
import { convertDateToFormat, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { formatAmount } from "@/utils/formatters/formatAmount";
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
  const { fetchTransactionsByAgency, isLoading, error, data, count } = useFetchTransactionsByAgency();
  const [date, setDate] = useState(props.dateRange ?? getDefaultDateAsString())
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('');


  useEffect(() => {
    setTransactions(data)
  }, [JSON.stringify(data)])

  function fetchData() {
    fetchTransactionsByAgency({
      ...date,
      AgencyName: props.AgencyName,
      status
    });
  }

  useEffect(() => {
    fetchData()
  }, [date, props.AgencyName, status]);

  function onDateApplied(date: DateRange) {
    setDate({
      startDate: convertDateToFormat(date.from),
      endDate: convertDateToFormat(date.to ?? new Date()),
    });
  }

  function onPageChange(selectedItem: {
    selected: number;
  }) {
    setPage(selectedItem.selected)
  }

  function onStatusChange(status: string) {
    setStatus(status);
  }

  return <div>
    <TransactionTable onStatusChange={onStatusChange}
      onDateApplied={onDateApplied}
      name={`Recent Transactions for ${props.AgencyName}`}
      transactions={transactions}
      isLoading={isLoading}
      count={count} page={page} onPageChange={onPageChange}
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
  const [selectedTab, setSelectedTab] = useState<string>();
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
      <div className="flex flex-col px-8 py-8 gap-8">
        <h1 className="font-medium text-2xl">Agency</h1>
        <NetworkRequestContainer isLoading={isLoading} error={error} onRetry={fetchData}>
          <div>
            <div className="grid grid-cols-3 gap-8">
              {groups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => setSelectedTab(group._id)}
                  className={cn(
                    "flex items-center rounded-lg cursor-pointer",
                    group._id == selectedTab ? `bg-gray-100` : `bg-white`
                  )}
                >
                  <OverviewItem
                    key={group._id}
                    title={group._id}
                    description={`${formatAmount(Number(group.totalAmountPaid))} transactions`}
                    iconClassName="text-blue-800 bg-blue-300"
                  />
                </div>
              ))}
            </div>
            {/* <Carousel
              // style={{
              //   maxWidth: width,
              // }}
              className="m-0 p-0 h-full"
            >
              <CarouselContent
                // style={{
                //   height,
                // }}
                className="h-[150px] p-0 m-0 !ml-0"
              >
                {groups.map((group) => (
                  <CarouselItem
                    key={group._id}
                    onClick={() => setSelectedTab(group._id)}
                    className={cn(
                      "flex items-center rounded-lg cursor-pointer mr-8",
                      group._id == selectedTab ? `bg-gray-100` : `bg-white`
                    )}
                  >
                    <OverviewItem
                      key={group._id}
                      title={group._id}
                      description={`₦${formatAmount(group.totalAmountPaid.toLocaleString())} transactions`}
                      iconClassName="text-blue-800 bg-blue-300"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex items-center justify-center mt-8 gap-8">
                <CarouselPrevious
                  className="relative text-black"
                />
                <CarouselNext
                  className="relative text-black"
                />

              </div>
            </Carousel> */}
            {(!isLoading && selectedTab) && <div className="mt-4">
              <AgentsTable AgencyName={selectedTab} dateRange={date} />
            </div>}
          </div>
        </NetworkRequestContainer>
      </div >
    </DashboardLayout >
  );
}
