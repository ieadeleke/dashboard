import CircularProgress from '@mui/material/CircularProgress';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from "react";

export const DefaultMap = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCjEOk6vk9MIcyZOjff2O-GXebUkEngPzY"
    })
    const mapRef = useRef<GoogleMap>(null)
    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(0)

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
        if (isLoaded) {
            setTimeout(() => {
                mapRef.current?.state.map?.panTo({
                    lat: 6.595770,
                    lng: 3.337080
                })
                setZoom(20)
                // mapRef.current?.state.map?.setZoom(100)
            }, 2000)
        }
        // setTrips(getTripData(6))
    }, [isLoaded])

    return isLoaded ? (
        <div className="relative flex flex-col gap-8 lg:h-[500px]">
            <div className="h-[500px]">
                <GoogleMap
                    ref={mapRef}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </div>

            {/* <div className="grid grid-cols-1 left-0 top-0 z-10 gap-4 h-full md:grid-cols-2 lg:absolute lg:flex flex-col lg:overflow-y-scroll lg:no-scrollbar lg:p-4">
            {trips.map((item) => <Link key={item.id} href={`/tracking/activities/${item.id}`}>
              <TripHistoryItem data={item} />
            </Link>)
            }
          </div> */}
        </div>
    ) : <div className="h-[500px] flex flex-col justify-center items-center">
        <CircularProgress />
    </div>
}

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};