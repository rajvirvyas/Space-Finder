import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, List, ListItem, Menu, MenuItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import { Star } from '@mui/icons-material';

export default function StudyCard(props) {
    const { id, studyName, liveStatus, rating, image } = props;
    const [isStarred, setIsStarred] = useState(false);
    const [open, setOpen] = useState(false);
    const [ratingState, setRatingState] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ formState, setFormState ] = useState({});
    const [ error, setError ] = useState(false);
    const router = useRouter();

  useEffect(() => {
    fetch(`/api/ratings/${id}`, { method: 'GET'})
      .then((response) => response.ok && response.json())
      .then((ratings) => {
        const values = ratings.map((rating) => ({ userId: rating.userId, value: rating.value }));
        setRatingState(values);
      });
  }, []);

  function toggleStar() {
    setIsStarred(!isStarred);
  }
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleCheckIn = () => {
      setAnchorEl(null); // Close the menu when "Check In" is clicked
      displayCheckInMessage(); // Function to display a pop-up message
    };
  
    const displayCheckInMessage = () => {
      alert('Yay! You\'ve checked in.');
    };
    
    const handleRatingChange = async (event, newValue) => {
      try {
        // Send a request to your backend to update the rating
        const response = await fetch('/api/ratings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studySpaceID: id,
            value: newValue,
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

          setRatingState(updatedRatings);
        } else {
          throw new Error('Failed to update rating');
        }
      } catch (error) {
        console.error(error);
        // Handle the error here, e.g. display an error message to the user
      }
    };

    const handleReportButton = (event, newValue) => {
      setOpen(true);
      setFormState({});
    };

    function handleClose() {
      setOpen(false);
    }

  return (
    <Card
      sx={{
        mx: 2,
        mb: 10,
        bgcolor: '#dfebe9',
        boxShadow: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        width: 300,
        height: 500
      }}
      
    >
      <CardContent>
      <Button sx={{ position: 'absolute', top: 20, left: 10, zIndex: 1, color: 'black',}} onClick={toggleStar}>
                {isStarred ? <BookmarkAddedIcon sx={{fontSize: 30, color: 'white'}} /> : <BookmarkAddIcon sx={{fontSize: 30, color: 'white'}} />}
            </Button>
        <CardMedia
          component="img"
          sx={{
            borderRadius: 2,
            boxShadow: 6,
            display: { xs: 'none', sm: 'block' },
            ':hover': { cursor: 'pointer' },
          }}
          image={image}
          alt={"study"}
          onClick={() => router.push(`/studyspot/${id}`)}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography component="div">
              {studyName}
            </Typography>
            <Button
              onClick={handleMenuClick}
              sx={{ color: 'black', ':hover': { bgcolor: 'gray' } }}
              size="small"
            >
              . . .
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleCheckIn}>Check In</MenuItem>
              <MenuItem onClick={handleMenuClose}>Rate: 
              <Rating
            name="rating"
            value={ratingState}
            precision={0.5}
            onChange={handleRatingChange}/>
          </MenuItem>
              <MenuItem onClick={handleReportButton}>Report</MenuItem>
              </Menu>
              {/* -------------------------------- */}
               {/* <Button variant="underlined" color="inherit" onClick={handleReportButton}>Add Spot</Button> */}
      {open && <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report Study Spot</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            To Report any inaccuracies, please fill in the following fields.
          </DialogContentText>
          { error ? (
            <Alert severity="error">There was an issue submitting the report, please adjust the fields and try again.</Alert>
          ) : null }
          <TextField
            autoFocus
            margin="dense"
            id="spotName"
            name="spotName"
            label="Spot Name"
            type="spotName"
            fullWidth
            variant="standard"
            required
     
          />
          <TextField
            margin="dense"
            id="building"
            name="building"
            label="Building"
            type="building"
            required
            fullWidth
            variant='standard'/>
          <TextField
            margin="dense"
            name="capacity"
            id="SpotCap"
            label="Spot Capacity"
            inputProps={{min: 0}}
            type="number"
            required
            fullWidth
            variant='standard'/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit for Review</Button>
        </DialogActions>
        
      </Dialog>}
        {/* -------------------------------- */}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              Live Status: {liveStatus}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                      <Typography sx={{mt:1.5}} color="text.secondary">
                          Rating: {ratingState.length === 0 ? 0 : (ratingState.map(obj => obj.value).reduce((a, b) => a + b, 0) / ratingState.length).toFixed(1)}
                          {` (${ratingState.length} ratings)`}
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
            <Button sx={{ bgcolor: 'black', color: 'white', ':hover': { bgcolor: 'gray'}}} size="small"
            onClick={() => router.push(`/studyspot/${id}`)}>Comments</Button>
        </Box>
      </CardActions>
    </Card>
  );
}