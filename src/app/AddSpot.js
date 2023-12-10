'use client'
import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function AddSpot() {
  const [ open, setOpen ] = useState(false);
  const [ formState, setFormState ] = useState({});
  const [ error, setError ] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  })

  const amenitiesList = [
    'Wifi',
    'Coffee',
    'Printer',
    'Whiteboard',
    'Projector',
    'Kitchen',
    'Parking',
    'Bike Rack',
    'Bathroom',
    'Water Fountain',
    'Microwave',
    'Vending Machine',
  ];

  const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

  const [map, setMap] = useState(null)
  const [center, setCenter] = useState({
      lat: 35.305,
      lng: -120.6625
  })
  const [markerPosition, setMarkerPosition] = useState(center);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const onMapDoubleClick = useCallback((event) => {
    setMarkerPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
    });
  }, []);

  const onLoad = useCallback(function callback(map) {
      findLocation()
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map)
  }, [center])

  const onUnmount = useCallback(function callback(map) {
      setMap(null)
  }, [])  

  function handleAddButton() {
    setOpen(true);
    setFormState({});
  }

  function handleClose() {
    setOpen(false);
    setError(false)
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

  const submitSpot = async () => {
    fetch('/api/study-spaces', {
      method: 'POST',
      body: JSON.stringify({
        name: formState.spotName,
        building: formState.building,
        longitude: markerPosition.lng,
        latitude: markerPosition.lat,
        capacity: formState.capacity,
        amenities: selectedAmenities,
        rating: [],
        busyness: 0,
        img: "https://content-calpoly-edu.s3.amazonaws.com/foundation/1/images/20130820_science-math_app_0072%20%2875%25%29.jpg",
      })
    }).then((res) => {
      if (res.status === 200) {
        handleClose();
      } else {
        setError(true);
      }
    });
  }

  const handleAmenityChange = (event) => {
    setSelectedAmenities(event.target.value);
  };

  return (
    <>
      <Button variant="underlined" color="inherit" onClick={handleAddButton}>Add Spot</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Study Spot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add a new spot, please fill in the following fields.
          </DialogContentText>
          { error ? (
            <Alert severity="error">There was an issue submitting the study spot, please adjust the fields or log in and try again.</Alert>
          ) : null }
          <TextField
            onChange={(e) => setFormState({...formState, spotName: e.target.value})}
            autoFocus
            margin="dense"
            id="spotName"
            name="spotName"
            label="Spot Name"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => setFormState({...formState, building: e.target.value})}
            margin="dense"
            id="building"
            name="building"
            label="Building"
            type="text"
            required
            fullWidth
            variant='standard'/>
          <TextField
            onChange={(e) => setFormState({...formState, capacity: e.target.value})}
            margin="dense"
            name="capacity"
            id="capacity"
            label="Spot Capacity"
            inputProps={{min: 0}}
            type="number"
            required
            fullWidth
            variant='standard'/>
            <Box sx={{ display: 'flex', gap: 4}}>
                    <FormControl sx={{ m: 1, width: "100vw" }}>
                    <InputLabel>Amenities</InputLabel>
                    <Select
                        id="amenities"
                        multiple
                        value={selectedAmenities}
                        onChange={handleAmenityChange}
                        label="Amenities"
                        renderValue={() => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selectedAmenities.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {amenitiesList.map((amenity) => (
                            <MenuItem
                              key={amenity}
                              value={amenity}
                            >
                                <Checkbox checked={selectedAmenities.indexOf(amenity) > -1} />
                                <ListItemText primary={amenity} />
                            </MenuItem>
                          ))}
                    </Select>
                    </FormControl>
                </Box>
            
          {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '200px'}}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={onMapDoubleClick}
                    disableZoom={true}
                    options={{
                        styles: [
                            {
                                elementType: 'labels.icon',
                                stylers: [{visibility: 'off'}]
                            }
                        ]
                    }}
                >
                  <Marker position={markerPosition}></Marker>
                </GoogleMap>
        ) : <></>}  
        <DialogContentText>Please mark (click) the spot on the map</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitSpot} type="submit">Submit for Review</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
