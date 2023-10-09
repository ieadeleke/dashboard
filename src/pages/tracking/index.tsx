import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from "react";
import SearchIcon from '@/assets/icons/ic_search.svg'
import { TripHistoryItem } from "@/components/dashboard/trip-history/TripHistoryItem";
import Link from "next/link";
import { getTripData, Trip } from "@/utils/data/trip";
import SEO from "@/components/SEO";

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export default function Tracking() {
  const [trips, setTrips] = useState<Trip[]>([])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  useEffect(() => {
    setTrips(getTripData(6))
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
        {isLoaded ? (
          <div className="relative flex flex-col gap-8 lg:h-[500px]">
            <div className="h-[500px]">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            </div>

            <div className="grid grid-cols-1 left-0 top-0 z-10 gap-4 h-full md:grid-cols-2 lg:absolute lg:flex flex-col lg:overflow-y-scroll lg:no-scrollbar lg:p-4">
              {trips.map((item) => <Link href={`/tracking/activities/${item.id}`}>
                <TripHistoryItem data={item} />
              </Link>)
              }
            </div>
          </div>
        ) : <></>}
      </div>
    </DashboardLayout>
  )
}
