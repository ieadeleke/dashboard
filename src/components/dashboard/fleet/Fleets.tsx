import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FleetItem } from "./FleetItem"

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
        name: "Inactive",
        value: "inactive"
    }
]

export const Fleets = () => {
    return <Tabs defaultValue="active" className="flex flex-col">
        <div className="flex py-2 items-center">
            <p className="font-bold">Fleets</p>
            <div className="flex-1" />

            <div>
                <TabsList className="bg-transparent">
                    {tabs.map((item) => <TabsTrigger key={item.value} className="data-[state=active]:bg-[#F6F6F6] text-gray-500 rounded-full data-[state=active]:text-primary" value={item.value}>{item.name}</TabsTrigger>)}
                </TabsList>

            </div>
        </div>

        <div className="bg-white rounded-xl lg:h-[500px]">
            <TabsContent value="active">
                <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
                    <FleetItem />
                    <FleetItem />
                    <FleetItem />
                </div>
            </TabsContent>
            <TabsContent value="all">All</TabsContent>
            <TabsContent value="inactive">Inactive</TabsContent>
        </div>
    </Tabs>
}