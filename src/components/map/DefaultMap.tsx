import CircularProgress from '@mui/material/CircularProgress';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { forwardRef } from 'react';
import { useCallback, useEffect, useRef, useState } from "react";

type DefaultMapProps = {
    className: string
}

type DefaultMapRef = {

}

export const DefaultMap = forwardRef<DefaultMapRef, DefaultMapProps>(({ className, ...props }) => {
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

    return isLoaded ? <GoogleMap
        mapContainerClassName={className}
        ref={mapRef}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
    >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
    </GoogleMap> : <div className="h-[500px] flex flex-col justify-center items-center">
        <CircularProgress />
    </div>
})

const containerStyle = {
    width: '100%'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

DefaultMap.displayName = "DefaultMap"