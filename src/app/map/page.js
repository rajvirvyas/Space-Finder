"use client"
import React from 'react'
import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

function Map() {
    const [open, setOpen] = useState(false);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    })

    const [map, setMap] = React.useState(null)
    const [center, setCenter] = React.useState({
        lat: 35.305,
        lng: -120.6625
    })

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        findLocation();
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

    function toggleOpen() {
        setOpen(!open);
    }

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
                    mapContainerStyle={{width: '100%', height: '85vh'}}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    disableDoubleClickZoom={true}
                    onDblClick={onMapDoubleClick}
                    options={{
                        styles: [
                            {
                                elementType: 'labels.icon',
                                stylers: [{visibility: 'off'}]
                            }
                        ]
                    }}
                >
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                            <Button onClick={findLocation} sx={{backgroundColor: 'white', boxShadow: 2}}>Find Me</Button>
                    </Box>
                    <Marker onClick={toggleOpen} position={markerPosition} title='My Marker!'>
                        {open && <InfoWindow onCloseClick={() => toggleOpen()}>
                                <Box>
                                    <Typography>Study Spot 1: Very Busy</Typography>
                                    <Typography>Lat: 1.23, Long: 45.67</Typography>
                                </Box>
                            </InfoWindow>}
                    </Marker>
                </GoogleMap>
        ) : <></>
    }
    export default React.memo(Map)

