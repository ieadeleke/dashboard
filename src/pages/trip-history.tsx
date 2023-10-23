import DashboardLayout from "@/components/layout/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useEffect, useRef, useState } from "react";
import { TripHistoryTab } from "@/components/dashboard/trip-history/TripHistoryTab";
import SEO from "@/components/SEO";
import { InitiateTripModal, InitiateTripModalRef } from "@/components/dashboard/trips/InitiateTripModal";
import { io } from 'socket.io-client'
import { Trip } from "@/models/trips";

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
  },
  {
    name: "Pending",
    value: "pending"
  }
]

const TRIP_ACTIVITIES = "laswa/TripActivities"
export default function TripHistory() {
  const [size, setSize] = useState(0)
  const initiateTripRef = useRef<InitiateTripModalRef>(null)
  const socket = io("ws://laswa.damdamtechnology.com", {
    transports: ['websocket']
  });

  function onTripActivities(data: Trip) {
    console.log({ data })
  }

  useEffect(() => {
    socket.on('disconnect', () => {
      console.log("diconnected")
    })

    socket.on("connect_error", (error) => {
      console.log(error)
    });

    socket.on('connect', () => {
      console.log("connected succesfully")
    })

    socket.on(TRIP_ACTIVITIES, onTripActivities)

    socket.connect()

    return () => {
      socket.off(TRIP_ACTIVITIES, onTripActivities)
    }
  }, [])

  function initiateTrip() {
    initiateTripRef.current?.open()
  }

  return (
    <DashboardLayout>
      <Tabs defaultValue="active" className="flex flex-col py-8">

        <div className="flex flex-col gap-6">
          <InitiateTripModal ref={initiateTripRef} />
          <SEO title="Laswa | Trip History" />
          <h1 className="text-2xl font-bold">Trip History <span className="text-primary">({size})</span></h1>

          <div>
            <TabsList className="flex-wrap justify-start bg-white h-auto py-0 px-0">
              {tabs.map((item) => <div className={``} key={item.value}>
                <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
              </div>)}
            </TabsList>
          </div>

          <TabsContent value="active">
            <TripHistoryTab onSizeUpdated={setSize} onInitiateTrip={initiateTrip} type={"active"} />
          </TabsContent>

          <TabsContent value="all">
            <TripHistoryTab onSizeUpdated={setSize} onInitiateTrip={initiateTrip} />
          </TabsContent>

          <TabsContent value="canceled">
            <TripHistoryTab onSizeUpdated={setSize} onInitiateTrip={initiateTrip} type={"canceled"} />
          </TabsContent>

          <TabsContent value="complete">
            <TripHistoryTab onSizeUpdated={setSize} onInitiateTrip={initiateTrip} type={"complete"} />
          </TabsContent>

          <TabsContent value="pending">
            <TripHistoryTab onSizeUpdated={setSize} onInitiateTrip={initiateTrip} type={"pending"} />
          </TabsContent>

        </div>
      </Tabs>
    </DashboardLayout>
  )
}
