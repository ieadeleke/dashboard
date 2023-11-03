import Empty from "@/components/states/Empty"
import Error from "@/components/states/Error"
import Loading from "@/components/states/Loading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fleet } from "@/models/fleets"
import { useFetchAllFleets } from "@/utils/apiHooks/fleets/useFetchAllFleets"
import { useEffect, useMemo } from "react"
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

type FleetComponentProps = {
    type: "all" | "active" | "inactive"
}

const FleetComponent = (props: FleetComponentProps) => {
    const { isLoading: isFetchLoading, fetchAllFleets, data: _data, error: isFetchError } = useFetchAllFleets()
    const { type } = props

    const data = useMemo(() => {
        if (type == 'active') {
            return _data.filter((item) => item.status == 'active').slice(0, 3)
        } else if (type == 'inactive') {
            return _data.filter((item) => item.status != 'active').slice(0, 3)
        } else return _data.slice(0, 3)
    }, [type, JSON.stringify(_data)])

    useEffect(() => {
        fetchAllFleets()
    }, [])

    return <div className="flex flex-col h-full">
        {isFetchLoading ? <Loading className="h-[400px]" /> : isFetchError ? <Error onRetry={fetchAllFleets} className="h-[400px]" /> : null}
        {(data.length == 0 && !isFetchLoading) ? <Empty title="Nothing to show" message="No data available" /> : <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => <FleetItem key={item._id} data={item} />)}
        </div>}
    </div>
}

export const Fleets = () => {
    const { isLoading: isFetchLoading, fetchAllFleets, data, error: isFetchError } = useFetchAllFleets()

    useEffect(() => {
        fetchAllFleets()
    }, [])

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

        <div className="bg-white rounded-xl min-h-[500px] lg:min-h-[500px]">
            <TabsContent value="active" className="h-full">
                <FleetComponent type="active" />
            </TabsContent>

            <TabsContent value="all" className="h-full">
                <FleetComponent type="all" />
            </TabsContent>

            <TabsContent value="inactive" className="h-full">
                <FleetComponent type="inactive" />
            </TabsContent>
        </div>
    </Tabs>
}