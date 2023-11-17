import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SearchIcon from '@/assets/icons/ic_search.svg'
import SEO from "@/components/SEO";
import { Trip } from "@/models/trips";
import { io } from 'socket.io-client'
import { BASE_WEBSOCKET_URL } from "@/utils/constants/strings";
import { DefaultMap } from "@/components/map/DefaultMap";
import { useFetchActiveTrips } from "@/utils/apiHooks/trips/useFetchActiveTrips";
import { TripHistoryItem } from "@/components/dashboard/trip-history/TripHistoryItem";
import { useRef } from "react";
import { TripDetailModal, TripDetailModalRef } from "@/components/dashboard/trips/TripsDetail";


const TRIP_STATUS_CHANNEL = "Trip/Admin/LiveTracking"

export default function Tracking() {
  const { isLoading, data, fetchActiveTrips, error } = useFetchActiveTrips()
  const tripDetailsRef = useRef<TripDetailModalRef>(null)
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    fetchActiveTrips()
  }, [])

  const socket = io(BASE_WEBSOCKET_URL, {
    transports: ['websocket']
  });

  function onChangeText(event: ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value)
  }

  function onTripStatusChanged(data: Trip) {
    console.log({ data })
  }

  const trips = useMemo(() => {
    const word = searchWord.toLowerCase()
    if (word.trim().length == 0) {
      return data
    }
    return data.filter((item) => item._id.toLowerCase().includes(word))
  }, [searchWord, JSON.stringify(data)])

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

    socket.on(TRIP_STATUS_CHANNEL, onTripStatusChanged)

    socket.connect()

    return () => {
      socket.off(TRIP_STATUS_CHANNEL, onTripStatusChanged)
    }
  }, [])

  function viewTripDetails(trip: Trip){
    tripDetailsRef.current?.open({
      data: trip
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 gap-8">
        <TripDetailModal ref={tripDetailsRef} />
        <SEO title="Laswa | Activities" />
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h1 className="font-bold text-lg">Life Tracking</h1>
          <div className="flex-1" />

          <TextField.Container onChange={onChangeText} className="bg-white rounded-xl border border-gray-100">
            <SearchIcon className="text-gray-200" />
            <TextField.Input placeholder="Search by Trip ID" />
          </TextField.Container>
        </div>

        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <DefaultMap className="h-full" />

          <div className="grid grid-cols-1 w-[30%] left-0 top-0 z-10 gap-4 h-full md:grid-cols-2 lg:absolute lg:flex flex-col lg:overflow-y-scroll lg:no-scrollbar lg:p-2">
            {trips.map((item) => <div key={item._id} onClick={() => viewTripDetails(item)}>
              <TripHistoryItem data={item} />
            </div>)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}