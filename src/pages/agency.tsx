import { DateRange } from "@/components/calendar/CalendarRange";
import DashboardLayout from "@/components/layout/dashboard";
import { OverviewItem } from "@/components/page_components/dashboard/Overview";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { cn } from "@/lib/utils";
import { useFetchGroupTranscations } from "@/utils/apiHooks/transactions/useFetchGroupTransactions";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

export default function Agents() {
  const {
    isLoading,
    data: groups,
    error,
    fetchGroupTransactions,
  } = useFetchGroupTranscations();
  const [selectedTab, setSelectedTab] = useState<string>("LASWA");

  useEffect(() => {
    fetchGroupTransactions({
      startDate: "2020-02-05",
      endDate: "2024-12-12",
    });
  }, []);

  function onDateApplied(date: DateRange){
    fetchGroupTransactions({
      startDate: moment(date.from).format('yyyy-mm-dd'),
      endDate: moment(date.to).format('yyyy-mm-dd'),
    });
  }

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
          <div className="mt-4">
            <TransactionTable
              onDateApplied={onDateApplied}
              name={`Recent Transactions for ${selectedTab}`}
              transactions={transactions}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
