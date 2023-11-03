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

export default function StudyCard(props) {
    const { studyName, liveStatus, rating } = props;
    const [ratingState, setRatingState] = useState(rating);

    function increaseRating() {
        setRatingState(ratingState + 0.5);
    }

    function decreaseRating() {
        setRatingState(ratingState - 0.5);
    }
  
    return (
      <Card sx={{ mx: 6, mb: 4, bgcolor: '#dfebe9', boxShadow: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CardContent>
              <CardMedia
                    component="img"
                    sx={{ borderRadius: 2, boxShadow: 6, display: { xs: 'none', sm: 'block' } }}
                    image={"https://picsum.photos/350/200"}
                    alt={"study"}
                />
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
