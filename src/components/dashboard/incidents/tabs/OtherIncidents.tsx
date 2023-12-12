import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Fleet } from "@/models/fleets";
import IncidentTab from "../IncidentTab";
import { GeneralIncidentProps } from "./OperatorsTab";


type OtherIncidentsProps = GeneralIncidentProps & {

}

const tabs = [
    {
        name: "Active",
        value: "active"
    },
    {
        name: "Approved",
        value: "approved"
    },
    {
        name: "Rejected",
        value: "rejected"
    },
    {
        name: "All",
        value: "all"
    }
]

export default function OtherIncidents(props: OtherIncidentsProps) {
    const [data, setData] = useState<Fleet[]>([])

    useEffect(() => {
        // setData(fleets)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Other Incidents <span className="text-primary">(50)</span></h1>

                <Tabs defaultValue="active" className="flex flex-col py-8 gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex">
                            <TabsList className="bg-white h-auto py-0 px-0">
                                {tabs.map((item) => <div className={``} key={item.value}>
                                    <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
                                </div>)}
                            </TabsList>
                        </div>

                        <TabsContent value="active">
                            <IncidentTab tab="active" addNewVesselIncident={props.addNewVesselIncident} addNewIndividualIncident={props.addNewIndividualIncident} addNewObjectIncident={props.addNewObjectIncident} />
                        </TabsContent>
                    </div>


                    <TabsContent value="approved">
                        <IncidentTab tab="approved" addNewVesselIncident={props.addNewVesselIncident} addNewIndividualIncident={props.addNewIndividualIncident} addNewObjectIncident={props.addNewObjectIncident} />
                    </TabsContent>

                    <TabsContent value="rejected">
                        <IncidentTab tab="rejected" addNewVesselIncident={props.addNewVesselIncident} addNewIndividualIncident={props.addNewIndividualIncident} addNewObjectIncident={props.addNewObjectIncident} />
                    </TabsContent>

                    <TabsContent value="all">
                        <IncidentTab tab="all" addNewVesselIncident={props.addNewVesselIncident} addNewIndividualIncident={props.addNewIndividualIncident} addNewObjectIncident={props.addNewObjectIncident} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
