"use client"
import React from 'react'
import { Button, Box } from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCszSIw3d3Q_UQkZrCTt50byd9MIoBqsTQ"
    })

    const [map, setMap] = React.useState(null)
    const [center, setCenter] = React.useState({
        lat: 35.305,
        lng: -120.6625
    })

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [center])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [markerPosition, setMarkerPosition] = React.useState(center);

    const onMapDoubleClick = React.useCallback((event) => {
        setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
    }, []);

    const findLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setMarkerPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

        return isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{width: '800px', height: '500px'}}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onDblClick={onMapDoubleClick}
                >
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                            <Button onClick={findLocation} sx={{backgroundColor: 'white', boxShadow: 2}}>Find Me</Button>
                    </Box>
                    <Marker position={markerPosition} title='My Marker!'></Marker>
                </GoogleMap>
        ) : <></>
    }
    export default React.memo(MyComponent)

