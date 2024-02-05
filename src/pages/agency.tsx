import DashboardLayout from "@/components/layout/dashboard";
import { OverviewItem } from "@/components/page_components/dashboard/Overview";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { cn } from "@/lib/utils";
import { useState } from "react";

const agencies = [
  {
    title: "LASWA",
    description: "$1.95M",
  },
  {
    title: "LAASPA",
    description: "$200M",
  },
  {
    title: "LASHMA",
    description: "$195M",
  },
  {
    title: "BLE",
    description: "$1.95M",
  },
];

export default function Agents() {
  const [selectedTab, setSelectedTab] = useState<string>("LASWA");

  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <h1 className="font-medium text-2xl">Agency</h1>
        <div>
          <div className="grid grid-cols-4 gap-4">
            {agencies.map((agency) => (
              <div
                onClick={() => setSelectedTab(agency.title)}
                className={cn(
                  " rounded-lg cursor-pointer",
                  agency.title == selectedTab ? `bg-gray-200` : `bg-white`
                )}
              >
                <OverviewItem
                  key={agency.title}
                  title={agency.title}
                  description={agency.description}
                  iconClassName="text-blue-800 bg-blue-300"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <TransactionTable name={`Recent Transactions for ${selectedTab}`} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
