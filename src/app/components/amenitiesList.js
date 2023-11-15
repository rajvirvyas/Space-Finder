import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function AmenitiesList() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      <ListItem disablePadding>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Wifi" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Water" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText inset primary="Air Conditioning" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Bathrooms" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText inset primary="Computers" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Individual Study Space" />
      </ListItem>
    </List>
  );
}