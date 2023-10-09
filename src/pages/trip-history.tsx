import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRightIcon, ChevronDown, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TripHistoryItem } from "@/components/dashboard/trip-history/TripHistoryItem";
import { TripDetailModal, TripDetailModalRef } from "@/components/dashboard/trips/TripsDetail";
import { useEffect, useRef, useState } from "react";
import { getTripData, Trip } from "@/utils/data/trip";
import { TripHistoryTab } from "@/components/dashboard/trip-history/TripHistoryTab";
import SEO from "@/components/SEO";

const tabs = [
  {
    name: "Active",
    value: "active"
  },
  {
    name: "All",
    value: "all"
  },
  {
    name: "Cancelled",
    value: "canceled"
  },
  {
    name: "Complete",
    value: "complete"
  }
]


export default function Home() {
  const [data, setData] = useState<Trip[]>([])

  useEffect(() => {
    setData(getTripData(50))
  }, [])



  return (
    <DashboardLayout>
      <Tabs defaultValue="active" className="flex flex-col py-8">

        <div className="flex flex-col gap-6">
        <SEO title="Laswa | Trip History" />
          <h1 className="text-2xl font-bold">Trip History <span className="text-primary">({data.length})</span></h1>

          <div>
            <TabsList className="flex-wrap justify-start bg-white h-auto py-0 px-0">
              {tabs.map((item) => <div className={``} key={item.value}>
                <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
              </div>)}
            </TabsList>
          </div>

          <TabsContent value="active">
            <TripHistoryTab data={data.filter((item) => item.status == "active")} />
          </TabsContent>

          <TabsContent value="all">
            <TripHistoryTab data={data} />
          </TabsContent>

          <TabsContent value="canceled">
            <TripHistoryTab data={data.filter((item) => item.status == "canceled")} />
          </TabsContent>

          <TabsContent value="complete">
            <TripHistoryTab data={data.filter((item) => item.status == "complete")} />
          </TabsContent>

        </div>
      </Tabs>
    </DashboardLayout>
  )
}
