import DashboardLayout from "@/components/layout/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { Fleet } from "@/models/fleets";
import OperatorsTab from "@/components/dashboard/incidents/tabs/OperatorsTab";
import OtherIncidents from "@/components/dashboard/incidents/tabs/OtherIncidents";
import {
  AddIncidentWithVesselModal,
  AddIncidentWithVesselModalRef,
} from "@/components/dashboard/incidents/AddIncidentWithVesselModal";
import {
  AddIncidentWithObjectModal,
  AddIncidentWithObjectModalRef,
} from "@/components/dashboard/incidents/AddIncidentWithObject";
import {
  AddIncidentWithPeopleModal,
  AddIncidentWithPeopleModalRef,
} from "@/components/dashboard/incidents/AddIncidentWithPeople";

const tabs = [
  {
    name: "Operators",
    value: "operators",
  },
  {
    name: "Others",
    value: "others",
  },
];

export default function IndidentsPage() {
  // const fleets = getFleetData(50)
  const addVesselIncidentModalRef = useRef<AddIncidentWithVesselModalRef>(null);
  const addIndividualIncidentModalRef =
    useRef<AddIncidentWithPeopleModalRef>(null);
  const addObjectIncidentModalRef = useRef<AddIncidentWithObjectModalRef>(null);

  const [data, setData] = useState<Fleet[]>([]);

  useEffect(() => {
    // setData(fleets)
  }, []);

  function addNewVesselIncident() {
    addVesselIncidentModalRef.current?.open();
  }

  function addNewINdividualIncident() {
    addIndividualIncidentModalRef.current?.open();
  }

  function addNewObjectIncident() {
    addObjectIncidentModalRef.current?.open();
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
          <OtherIncidents
            addNewIndividualIncident={addNewINdividualIncident}
            addNewObjectIncident={addNewObjectIncident}
            addNewVesselIncident={addNewVesselIncident}
          />
        </div>
      </Tabs>
    </DashboardLayout>
  );
}
