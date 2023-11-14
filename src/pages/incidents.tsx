import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { ChevronDown, PlusIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FleetTableDataList } from "./fleets";
// import { Fleet, getFleetData } from "@/utils/data/fleets";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { Fleet } from "@/models/fleets";
import OperatorsTab from "@/components/dashboard/incidents/tabs/OperatorsTab";
import { AddIncidentModal, AddIncidentModalRef } from "@/components/dashboard/incidents/AddIncidentModal";
import OtherIncidents from "@/components/dashboard/incidents/tabs/OtherIncidents";

const tabs = [
  {
    name: "Operators",
    value: "operators"
  },
  {
    name: "Others",
    value: "others"
  }
]


export default function IndidentsPage() {
  // const fleets = getFleetData(50)
  const addIncidentModalRef = useRef<AddIncidentModalRef>(null)
  const [data, setData] = useState<Fleet[]>([])

  useEffect(() => {
    // setData(fleets)
  }, [])

  function addNewIncident() {
    addIncidentModalRef.current?.open()
  }

  return (
    <DashboardLayout>
      <Tabs defaultValue="operators" className="flex flex-col py-8">
        <AddIncidentModal ref={addIncidentModalRef} />
        <div className="flex flex-col gap-6">
          <SEO title="Laswa | Incidents" />
          <div className="flex justify-center">
            <TabsList className="bg-white h-auto py-0 px-0">
              {tabs.map((item) => <div className={``} key={item.value}>
                <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
              </div>)}
            </TabsList>
          </div>

          <TabsContent value="operators">
            <OperatorsTab addNewIncident={addNewIncident} />
          </TabsContent>
        </div>


        <TabsContent value="others">
          <OtherIncidents addNewIncident={addNewIncident} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
