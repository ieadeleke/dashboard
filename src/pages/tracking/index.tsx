import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { useEffect } from "react";
import SearchIcon from '@/assets/icons/ic_search.svg'
import SEO from "@/components/SEO";
import { Trip } from "@/models/trips";
import { io } from 'socket.io-client'
import { BASE_WEBSOCKET_URL } from "@/utils/constants/strings";
import { DefaultMap } from "@/components/map/DefaultMap";


const TRIP_STATUS_CHANNEL = "Trip/Admin/LiveTracking"

export default function Tracking() {


  const socket = io(BASE_WEBSOCKET_URL, {
    transports: ['websocket']
  });

  function onTripStatusChanged(data: Trip) {
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

    socket.on(TRIP_STATUS_CHANNEL, onTripStatusChanged)

    socket.connect()

    return () => {
      socket.off(TRIP_STATUS_CHANNEL, onTripStatusChanged)
    }
  }, [])


  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 gap-8">
        <SEO title="Laswa | Activities" />
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h1 className="font-bold text-lg">Life Tracking</h1>
          <div className="flex-1" />

          <TextField.Container className="bg-white rounded-lg border border-gray-100">
            <SearchIcon className="text-gray-200" />
            <TextField.Input placeholder="Search" />
          </TextField.Container>
        </div>
        <DefaultMap />
      </div>
    </DashboardLayout>
  )
}