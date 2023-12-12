import DashboardLayout from "@/components/layout/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { Fleet } from "@/models/fleets";
import OperatorsTab from "@/components/dashboard/incidents/tabs/OperatorsTab";
import OtherIncidents from "@/components/dashboard/incidents/tabs/OtherIncidents";
import { AddIncidentWithVesselModal, AddIncidentWithVesselModalRef } from "@/components/dashboard/incidents/AddIncidentWithVesselModal";
import { AddIncidentWithObjectModal, AddIncidentWithObjectModalRef } from "@/components/dashboard/incidents/AddIncidentWithObject";
import { AddIncidentWithPeopleModal, AddIncidentWithPeopleModalRef } from "@/components/dashboard/incidents/AddIncidentWithPeople";

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
  const addVesselIncidentModalRef = useRef<AddIncidentWithVesselModalRef>(null)
  const addIndividualIncidentModalRef = useRef<AddIncidentWithPeopleModalRef>(null)
  const addObjectIncidentModalRef = useRef<AddIncidentWithObjectModalRef>(null)

  const [data, setData] = useState<Fleet[]>([])

  useEffect(() => {
    // setData(fleets)
  }, [])

  function addNewVesselIncident() {
    addVesselIncidentModalRef.current?.open()
  }

  function addNewINdividualIncident() {
    addIndividualIncidentModalRef.current?.open()
  }

  function addNewObjectIncident() {
    addObjectIncidentModalRef.current?.open()
  }

  return (
    <DashboardLayout>
      <Tabs defaultValue="operators" className="flex flex-col py-8">
        {/* <AddIncidentModal ref={addIncidentModalRef} /> */}
        <AddIncidentWithVesselModal ref={addVesselIncidentModalRef} />
        <AddIncidentWithPeopleModal ref={addIndividualIncidentModalRef} />
        <AddIncidentWithObjectModal ref={addObjectIncidentModalRef} />

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
            <OperatorsTab addNewIndividualIncident={addNewINdividualIncident} addNewObjectIncident={addNewObjectIncident} addNewVesselIncident={addNewVesselIncident} />
          </TabsContent>
        </div>


        <TabsContent value="others">
          <OtherIncidents addNewIndividualIncident={addNewINdividualIncident} addNewObjectIncident={addNewObjectIncident} addNewVesselIncident={addNewVesselIncident} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
