import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, List, ListItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function StudyCard(props) {
    const { studyName, liveStatus, rating } = props;
    const [isStarred, setIsStarred] = useState(false);
    const [open, setOpen] = useState(false);

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
                {isStarred ? <BookmarkAddedIcon sx={{fontSize: 30, color: 'white'}} /> : <BookmarkAddIcon sx={{fontSize: 30, color: 'white'}} />}
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
                      <Typography sx={{mt:1.5}} color="text.secondary">
                          Rating: {rating}
                      </Typography>
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
