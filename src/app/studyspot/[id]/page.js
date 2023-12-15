"use client"
import {
  Box,
  Typography,
  Button,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slider,
  TextField,
  Paper,
  Grid,
  CardMedia,
  MenuItem,
  Rating
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Comments from '../../components/comments';
import AmenitiesList from '../../components/amenitiesList';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

function StudySpot(props) {
  const { data: session, status }  = useSession();

    const [open, setOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [spotName, setSpotName] = useState("")
    const [reason, setReason] = useState("");
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    })
    const params = useParams();
    const [spot, setSpot] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [map, setMap] = React.useState(null)
    const [ratingState, setRatingState] = useState([]);
    const [ratingNum, setRatingNum] = useState(0);
    const [amenities, setAmenities] = useState([]);
    const [ratingLen, setRatingLen] = useState(0);
    const [ratings, setRatings] = useState([]);
    const [ratingReason, setRatingReason] = useState('');
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [center, setCenter] = React.useState({
        lat: 35.305,
        lng: -120.6625
    })

    useEffect(() => {
        fetch('/api/study-spaces/' + params.id, { method: 'GET', params: {id: params.id} })
          .then((response) => response.ok && response.json())
          .then((data) => {
            setSpot(data);
            setAmenities(data.amenities);
            setRatingNum(data.avgRating);
            setCenter({lat: data.latitude, lng: data.longitude});
            fetch(`/api/ratings/${data.id}`, { method: 'GET'})
              .then((response) => response.ok && response.json())
              .then((ratings) => {
                setRatingState(ratings);
                setRatingLen(ratings.length);
                setRatings(ratings);
            });
          });
      }, []);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [center])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])  

    const handleRatingOpen = (event, newValue) => {
      setRatingNum(newValue);
      setRatingModalOpen(true);
    };
    
    const handleRatingClose = () => {
      setRatingModalOpen(false);
    };

    function flagSpot() {

      if (name && name.length && spotName && spotName.length && reason && reason.length) {
        fetch("/api/report", { method: "post", body: JSON.stringify({
          userName: name,
          spotName: spotName,
          reason: reason,
          studySpaceId: parseInt(params.id)
          }) } );
        // Send a request to your backend to update the rating
        fetch(`/api/study-spaces/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            flagged: true,
          }),
        });
        setReportOpen(false);
        displayFlaggedSpotMessage();
        setName("");
        setSpotName("");
        setReason("");
    }
  }

    function toggleOpen() {
      setOpen(!open);
    }

      const handleCheckIn = () => {
        setAnchorEl(null); // Close the menu when "Check In" is clicked
        displayCheckInMessage(); // Function to display a pop-up message
      };

      const getRatingDialog = () => {
        return (<Dialog open={ratingModalOpen} onClose={handleRatingClose}>
          <DialogTitle>Please Provide a Reason For Your Rating</DialogTitle>
          <DialogContent>
              <TextField
                margin="dense"
                id="reason"
                name="reason"
                label="Reason"
                type="reason"
                required
                fullWidth
                variant='standard'
                onChange={e => {
                  setRatingReason(e.target.value);
                }}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRatingClose}>Cancel</Button>
            <Button onClick={handleRatingChange}>Submit</Button>
          </DialogActions>
        </Dialog>);
      }

      const getReportDialog = () => {
        return (<Dialog open={reportOpen} onClose={() => setReportOpen(false)}>
        <DialogTitle>Report Study Spot</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            To Report any inaccuracies, please fill in the following fields.
          </DialogContentText>
          { error ? (
            <Alert severity="error">There was an issue submitting the report, please adjust the fields and try again.</Alert>
          ) : null }
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="name"
            required
            fullWidth
            variant='standard'
            onChange={e => {
              setName(e.target.value);
            }}/>
          <TextField
            margin="dense"
            id="spotName"
            name="spotName"
            label="Spot Name"
            type="spotName"
            required
            fullWidth
            variant='standard'
            onChange={e => {
              setSpotName(e.target.value);
            }}/>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            name="reason"
            label="Reason For Report"
            type="reason"
            fullWidth
            variant="standard"
            onChange={e => {
              setReason(e.target.value);
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={flagSpot}>Submit for Review</Button>
        </DialogActions>
        
      </Dialog>);
    }
    
      const displayCheckInMessage = () => {
        alert('Yay! You\'ve checked in.');
      };

      const displayFlaggedSpotMessage = () => {
        alert('This spot has been flagged, sorry for the inconvenience.');
      }
          
      const handleRatingChange = async () => {
        try {
          if (ratingReason && ratingReason.length !== 0) {
            let response = await fetch('/api/ratings', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                studySpaceID: spot.id,
                value: ratingNum,
                comment: ratingReason,
              }),
            });
    
            if (response.ok) {
              const responseData = await response.json();
              const updatedRatings = ratingState.map((rating) => {
                if (rating.userId === responseData.userId) {
                  return { ...rating, value: responseData.value };
                }
                return rating;
              });
    
              if (!updatedRatings.some((rating) => rating.userId === responseData.userId)) {
                updatedRatings.push({ userId: responseData.userId, value: responseData.value });
              }
    
              let avgRatingNum = updatedRatings.length === 0 ? 0 : (updatedRatings.map(obj => obj.value).reduce((a, b) => a + b, 0) / updatedRatings.length).toFixed(1)
              response = await fetch(`/api/study-spaces/avg-rating/${spot.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  studyID: spot.id,
                  avgRating: avgRatingNum,
                }),
              });
    
              setRatingLen(updatedRatings.length);
              setRatingState(updatedRatings);
              setRatingModalOpen(false);

              fetch(`/api/ratings/${params.id}`, { method: 'GET'})
              .then((response) => response.ok && response.json())
              .then((ratings) => {
                setRatings(ratings);
            });
            } else {
              throw new Error('Failed to update rating');
            }
          } else {
            throw new Error('Please provide a reason for your rating');
          }
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Box sx={{p:2}}>
              <Box sx={{display: "flex", flexDirection: 'row', justifyContent: "space-between"}}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {spot.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {spot.building}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    School: Cal Poly SLO
                  </Typography>
                </Box>
                <CardMedia
          component="img"
          sx={{
            borderRadius: 2,
            boxShadow: 6,
            display: { xs: 'none', sm: 'block' },
            ':hover': { cursor: 'pointer' },
            maxHeight: 125,
            maxWidth: 300
          }}
          image={spot.img}
          alt={"study"}
        />
              </Box>
              {status === "authenticated" ? (
                <Box display="flex" flexDirection="row" justifyContent="space-around">
              <MenuItem onClick={handleCheckIn}>Check In</MenuItem>
              <Box sx={{display: "flex", flexDirection: "column", mt: 2}}>
                <Typography>Rate: 
                  <Rating precision={0.5} onChange={handleRatingOpen}/>
                </Typography>
                <Typography sx={{mx: "auto"}} color="text.secondary">
                  {ratingNum} {` (${ratingLen} ratings)`}
                </Typography>
              </Box>
              <MenuItem onClick={() => setReportOpen(true)}>Report</MenuItem>
              {ratingModalOpen && getRatingDialog()}
              {reportOpen && getReportDialog()}
                </Box>
              ) : (
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", mt: 2}} >
                  <Alert severity="warning">Must be signed in to Rate or Report</Alert>
                  <Button disabled>Rate</Button>
                  <Button disabled>Report</Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box sx={{ boxShadow:3, height: '16.7em', bgcolor: 'grey.500', borderRadius: 1}}>
              {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        styles: [
                            {
                                elementType: 'labels.icon',
                                stylers: [{visibility: 'off'}]
                            }
                        ]
                    }}
                >
                    <Marker onClick={toggleOpen} position={center}>
                        {open && <InfoWindow onCloseClick={() => toggleOpen()}>
                                <Box>
                                    <Typography>{spot.name}: Very Busy</Typography>
                                    <Typography>Lat: {spot.latitude.toFixed(2)}, Long: {spot.longitude.toFixed(2)}</Typography>
                                </Box>
                            </InfoWindow>}
                    </Marker>
                </GoogleMap>
        ) : <></>}
            </Box>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        <Divider orientation="horizontal" />
      </Box>
      <Grid container justifyContent={'space-between'} spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3}>
            <Box sx={{height: "100%"}} p={2}>
              <Typography variant="h4" component="h3">
                Comments
              </Typography>
              <Comments reviews={ratings}/>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" component="h3">
                Amenities
              </Typography>
              <AmenitiesList amenities={amenities}/>
            </Box>
          </Paper>
        </Grid>
        <Box sx={{boxShadow: 3, mt: 3, ml:2}} p={2}>
          <Typography variant="h4" component="h3">
            Busyness
          </Typography>
          <Slider
            aria-label="Rating"
            size="medium"
            defaultValue={2}
            step={1}
            min={0}
            max={5}
            marks={[{ value: 0, label: '0' }, { value: 5, label: '5' }]}
            valueLabelDisplay="auto"
          />
          <Box mt={2}>
            <Typography variant="h4" component="h3">
              Trends
            </Typography>
          </Box>
          <BarChart
            xAxis={[
              {
                id: 'Time',
                data: ['1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'],
                scaleType: 'band',
              },
            ]}
            series={[
              {
                data: [20, 33, 81, 45, 21, 76],
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Grid>
    </Box>
  );
}

export default StudySpot;
