import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function AmenitiesList({amenities}) {
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
  
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      {amenitiesList.map((item) => (
        <ListItem disablePadding key={item}>
          <ListItemIcon style={{ visibility: amenities.includes(item) ? 'visible' : 'hidden' }}>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
}