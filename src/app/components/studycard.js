import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, List, ListItem } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function StudyCard(props) {
    const { studyName, liveStatus, rating } = props;
    const [ratingState, setRatingState] = useState(rating);
    const [isStarred, setIsStarred] = useState(false);
    const [map, setMap] = useState(null)
    const [center, setCenter] = useState({lat: 35.305, lng: -120.6625})
    const [open, setOpen] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCszSIw3d3Q_UQkZrCTt50byd9MIoBqsTQ"
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

    function increaseRating() {
        setRatingState(ratingState + 0.5);
    }

    function decreaseRating() {
        setRatingState(ratingState - 0.5);
    }

    function toggleStar() {
        setIsStarred(!isStarred);
    }

    function toggleOpen() {
        setOpen(!open);
    }

    return (
      <Card sx={{ mx: 3, mb: 4, bgcolor: '#dfebe9', boxShadow: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <CardContent>
            <Button sx={{ position: 'absolute', top: 20, left: 10, zIndex: 1, color: 'black',}} onClick={toggleStar}>
                <StarBorderIcon sx={{fontSize: 30}} />
            </Button>
              <CardMedia
                    component="img"
                    sx={{ borderRadius: 2, boxShadow: 6, display: { xs: 'none', sm: 'block' } }}
                    image={"https://picsum.photos/350/200"}
                    alt={"study"}
                />
                {/* <Box sx={{mt: 2}}>
                    {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{width: '400px', height: '200px'}}
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                    <Marker onClick={toggleOpen} position={center} title='My Marker!'>
                        {open && <InfoWindow onCloseClick={() => toggleOpen()}>
                                <Box>
                                    <Typography>{studyName}: {liveStatus}</Typography>
                                    <Typography>Lat: {center.lat}, Long: {center.lng}</Typography>
                                </Box>
                            </InfoWindow>}
                    </Marker>
                </GoogleMap>
                ) : <></>}
                </Box> */}
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', p: 2}}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Typography variant="h5" component="div">
                          {studyName}
                      </Typography>
                      <Button sx={{color: 'black', fontWeight: 'bold' }}>. . .</Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                          Live Status: {liveStatus}
                      </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                          Rating:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                          <Button onClick={increaseRating} sx={{ minWidth: 5, color: 'black'}}><ArrowUpwardIcon /></Button>
                          <Typography sx={{mt: 1}}>{ratingState}</Typography>
                          <Button onClick={decreaseRating} sx={{ minWidth: 5, color: 'black'}}><ArrowDownwardIcon /></Button>
                      </Box>
                  </Box>
                <Box>
                    <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Top Amenities:
                    </Typography>
                    <List>
                        <ListItem>1. Wifi</ListItem>
                        <ListItem>2. Bathroom</ListItem>
                        <ListItem>3. Air Conditioning</ListItem>
                    </List>
                </Box>
            </Box>
      </CardContent>
      <CardActions sx={{ mt: -3 }}>
        <Box sx={{ ml: 4, mb: 2}}>
            <Button sx={{ bgcolor: 'black', color: 'white', ':hover': { bgcolor: 'gray'}}} size="small">Comments</Button>
        </Box>
      </CardActions>
    </Card>
  );
}
