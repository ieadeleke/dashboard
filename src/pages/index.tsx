import DashboardLayout from "@/components/layout/dashboard";
import { useFetchTranscations } from "@/utils/apiHooks/transactions/useFetchTransactions";
import PendingDeliveryIcon from "@/assets/icons/ic_delivery_pending.svg";
import CompletedDeliveryIcon from "@/assets/icons/ic_delivery_complete.svg";
import { CheckIcon, ListIcon, PersonStandingIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ScooterIcon from "@/assets/icons/ic_scooter.svg";
import { DayData, WeeklyDeliveries } from "@/components/page_components/dashboard/overview/WeeklyDeliveries";
import { DailyAnalytics } from "@/components/page_components/dashboard/overview/DailyAnalytics";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { DateRange } from "@/components/calendar/CalendarRange";
import moment from "moment";
import { convertDateToFormat, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { useDashboardInfo } from "@/utils/apiHooks/transactions/useDashboardInfo";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { cn } from "@/lib/utils";
import { useDashboardInfoDownload } from "@/utils/apiHooks/transactions/useGetDashbardInfoDownload";
import { TransactionPill } from "@/components/page_components/pill";


type OverviewItemProps = {
  title: string;
  description: string;
  icon?: JSX.Element;
  iconClassName?: string;
};

export const OverviewItem = (props: OverviewItemProps) => {
  return (
    <div className="flex items-center rounded-lg gap-4 px-2 p-4 py-10 bg-white">
      <div className="flex flex-col flex-1">
        <p className="font-medium line-clamp-1">{props.title}</p>
        <p className="font-bold">{props.description}</p>
      </div>

      <div className={cn("rounded-full p-2", props.iconClassName)}>
        {props.icon}
      </div>
    </div>
  );
};

function distributeCounts(data: DayData[]): { dayOfWeek: string; count: number }[] {
  const counts: { [key: string]: number } = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0
  };

  data.forEach(item => {
    counts[item.dayOfWeek] = item.count;
  });

  const result = Object.keys(counts).map(dayOfWeek => ({
    dayOfWeek,
    count: counts[dayOfWeek]
  }));

  return result;
}

function distributePieChartCounts(data: ({
  status: string;
  count: number;
  percentage: number;
})[]) {
  const success = data.find((item) => item.status == "Successful")
  const pending = data.find((item) => item.status == "Pending")
  const failed = data.find((item) => item.status == "Faled")

  return {
    success: {
      percentage: success?.percentage ?? 0,
      count: success?.count ?? 0
    },
    pending: {
      percentage: pending?.percentage ?? 0,
      count: pending?.count ?? 0
    },
    failed: {
      percentage: failed?.percentage ?? 0,
      count: failed?.count ?? 0
    }
  }
}

export default function Home() {
  const { isLoading: isDashboardLoading, data: dashboardData, error: dashboardError, getDashboardInfo } = useDashboardInfo();
  const { isLoading: summaryDownloadLoading, data: summaryDownloadData, error: summaryDownloadError, getSummaryDownloadInfo } = useDashboardInfoDownload();
  // const { isLoading: summaryDownloadLoading, data: summaryDownloadData, error: summaryDownloadError, getSummaryDownloadInfo } = useDashboardInfoDownload();

  const {
    isLoading,
    data: transactions,
    error,
    fetchTransactions,
    count,
  } = useFetchTranscations();
  const [date, setDate] = useState(getDefaultDateAsString(new Date()))
  const [page, setPage] = useState(0)
  const [summaryDownloadInfo, setSummaryDownloadInfo] = useState<any>({})

  useEffect(() => {
    if (dashboardData) {
      fetchData()
    }
  }, [dashboardData, page])

  useEffect(() => {
    if (summaryDownloadData) {
      setSummaryDownloadInfo(summaryDownloadData);
    }
  }, [summaryDownloadData])

  useEffect(() => {
    if (dashboardData) {
      fetchData()
    }
  }, [dashboardData, page])

  useEffect(() => {
    getDashboardInfo();
    getSummaryDownloadInfo();
  }, [])

  function fetchData() {
    fetchTransactions({
      ...date,
      page: page + 1
    });
  }

  useEffect(() => {
    fetchData()
  }, [date]);

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


  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <NetworkRequestContainer onRetry={getDashboardInfo} isLoading={isDashboardLoading} error={dashboardError}>
          {dashboardData && <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-2xl">Overview</h1>
              <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
                <OverviewItem
                  title="All Transactions"
                  description={dashboardData.AllTransaction.toString()}
                  iconClassName="text-blue-800 bg-blue-300"
                  icon={<ListIcon />}
                />
                <OverviewItem
                  title="Successful Transactions"
                  description={dashboardData.SuccessfulTransaction.toString()}
                  iconClassName="text-[#147D77] bg-[#c9f2f0ff]"
                  icon={<CheckIcon />}
                />
                <OverviewItem
                  title="Failed Transactions"
                  description={dashboardData.FailTransaction.toString()}
                  iconClassName="text-[#147D77] bg-[#c9f2f0ff]"
                  icon={<ScooterIcon />}
                />
                <OverviewItem
                  title="Pending Transactions"
                  description={dashboardData.PendingTransaction.toString()}
                  iconClassName="text-[#FF0000] bg-[#ffededff]"
                  icon={<PendingDeliveryIcon />}
                />
                <OverviewItem
                  title="Total Amount"
                  description={formatAmount(dashboardData.TotalAmount)}
                  iconClassName="text-[#23A321] bg-[#D9F7D8]"
                  icon={<CompletedDeliveryIcon />}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2">
              <WeeklyDeliveries total={dashboardData.WeeklyTransactions.reduce((total, transaction) => {
                return total + transaction.count;
              }, 0)
              } data={distributeCounts(dashboardData.WeeklyTransactions)} />
              <DailyAnalytics data={(distributePieChartCounts(dashboardData.WeeklyAnalytics))} />
            </div>
            <TransactionTable
              name="Recent Transactions"
              count={count} page={page} onPageChange={onPageChange}
              transactions={transactions}
              isLoading={isLoading}
              fetchData={fetchData}
              dateRange={date}
              onDateApplied={onDateApplied}
              error={error}
            />
          </div>}
        </NetworkRequestContainer>
      </div>
    </DashboardLayout>
  );
}
