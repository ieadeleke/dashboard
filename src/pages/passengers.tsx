import DashboardLayout from "@/components/layout/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PassengerTabBody } from "@/components/dashboard/passengers/PassengerTabBody";
import { useEffect, useState } from "react";
import { getPassengersData, Passenger } from "@/utils/data/passengers";
import SEO from "@/components/SEO";

const tabs = [
  {
    name: "Active",
    value: "active"
  },
  {
    name: "All",
    value: "all"
  }
]

export default function PassengersPage() {
  const [data, setData] = useState<Passenger[]>([])

  useEffect(() => {
    setData(getPassengersData(15))
  }, [])

  return (
    <DashboardLayout>
      <Tabs defaultValue="active" className="flex flex-col py-8">

        <div className="flex flex-col gap-6">
        <SEO title="Laswa | Passengers" />

          <h1 className="text-2xl font-bold">Passengers <span className="text-primary">({data.length})</span></h1>

          <div>
            <TabsList className="bg-white h-auto py-0 px-0">
              {tabs.map((item) => <div className={``} key={item.value}>
                <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
              </div>)}
            </TabsList>
          </div>

          <TabsContent value="active">
            <PassengerTabBody data={data} />
          </TabsContent>

          <TabsContent value="all">
            <PassengerTabBody data={data} />
          </TabsContent>

        </div>
      </Tabs>
    </DashboardLayout>
  )
}
