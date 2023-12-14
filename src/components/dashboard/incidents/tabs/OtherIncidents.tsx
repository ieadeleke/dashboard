import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OperatorsTab, { GeneralIncidentProps } from "./OperatorsTab";

type OtherIncidentsProps = GeneralIncidentProps & {};

const tabs = [
  {
    name: "Unapproved",
    value: "unapproved",
  },
  {
    name: "All",
    value: "all",
  },
];

export default function OtherIncidents(props: OtherIncidentsProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">
          Incidents <span className="text-primary">(50)</span>
        </h1>

        <Tabs defaultValue="unapproved" className="flex flex-col py-8 gap-6">
          <div className="flex">
            <TabsList className="bg-white h-auto py-0 px-0">
              {tabs.map((item) => (
                <div className={``} key={item.value}>
                  <TabsTrigger
                    className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary"
                    value={item.value}
                  >
                    {item.name}
                  </TabsTrigger>
                </div>
              ))}
            </TabsList>
          </div>

          <TabsContent value="unapproved">
            <OperatorsTab addNewIndividualIncident={props.addNewIndividualIncident} addNewObjectIncident={props.addNewObjectIncident} addNewVesselIncident={props.addNewVesselIncident} tab="unapproved" />
          </TabsContent>

          <TabsContent value="all">
            <OperatorsTab addNewIndividualIncident={props.addNewIndividualIncident} addNewObjectIncident={props.addNewObjectIncident} addNewVesselIncident={props.addNewVesselIncident} tab="all" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
