"use client"
import React, { useState, useEffect } from 'react'
import { Button, Box, Typography } from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

function Map() {
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [studySpots, setStudySpots] = useState([]);
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
        findLocation();
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [center])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [markerPosition, setMarkerPosition] = React.useState(center);

    function toggleOpen(spot) {
        setSelectedSpot(spot);
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
  
    useEffect(() => {
        fetch('/api/study-spaces', { method: 'GET', })
            .then((response) => response.ok && response.json())
            .then((data) => {
                setStudySpots(data);
                console.log(data);
            });
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '85vh' }}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            disableDoubleClickZoom={true}
            options={{
                styles: [
                    {
                        elementType: 'labels.icon',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button onClick={findLocation} sx={{ backgroundColor: 'white', boxShadow: 2 }}>Find Me</Button>
            </Box>
            <Marker position={markerPosition}
                icon={
                    {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/BSicon_lHST_azure.svg/500px-BSicon_lHST_azure.svg.png",
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 20),
                    }
                } />
            {studySpots.map((spot) => (
                <Marker onClick={() => toggleOpen(spot)} key={spot.id} position={{ lat: spot.latitude, lng: spot.longitude }} title={spot.name}>
                    {selectedSpot === spot && <InfoWindow onCloseClick={() => toggleOpen(null)}>
                        <Box>
                            <Typography>{spot.name}</Typography>
                            <Typography>Lat: {spot.latitude.toFixed(2)}, Long: {spot.longitude.toFixed(2)}</Typography>
                        </Box>
                    </InfoWindow>}
                </Marker>
            ))}
        </GoogleMap>
    ) : <></>
}
export default React.memo(Map)
