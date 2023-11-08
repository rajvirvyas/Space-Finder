import { Box, Slider, TextField, Typography, MenuItem, Select, InputLabel, Chip, FormControl, Checkbox, ListItemText } from '@mui/material';
import React, { useState } from 'react';

export default function Filter() {
    const [amenities, setAmenities] = useState([]);

    const handleAmenitiesChange = (event) => {
        setAmenities(event.target.value);
    };

    const amenitiesList = [
        'Wifi',
        'Coffee',
        'Printer',
        'Whiteboard',
        'Projector',
        'Kitchen',
        'Parking',
        'Bike Rack',
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

    return (
        <Box sx={{ height: '50%', width: '20%', 
        bgcolor: "#dfebe9", borderRadius: 3, boxShadow: 4, p: 2, mx: 6,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5}}>
            <Typography sx={{ fontSize: 24, letterSpacing: 1, mt: 3, mb: -2}}>
                Filters
            </Typography>
            <TextField id="outlined-basic" label="Search" variant="standard" size='small'/>
            <TextField id="outlined-basic" label="Building Name" variant="standard" size='small'/>
            <Box sx={{ width: 0.6 }}>
                <Typography>
                    Rating
                </Typography>
                <Slider
                    aria-label="Rating"
                    size="medium"
                    defaultValue={2}
                    step={1}
                    min={1}
                    max={5}
                    marks={[{value: 1, label: '1'}, {value: 5, label: '5'}]}
                    valueLabelDisplay="auto"
                />   
            </Box>
            <Box sx={{ width: 0.6 }}>
                <Typography>
                    Busyness
                </Typography>
                <Slider
                    aria-label="Busyness"
                    size="medium"
                    defaultValue={2}
                    step={1}
                    max={5}
                    marks={[{value: 0, label: '1'}, {value: 5, label: 'Full'}]}
                    valueLabelDisplay="auto"
                />   
            </Box>
            <Box sx={{ width: 0.6 }}>
                <Typography>
                    Proximity
                </Typography>
                <Slider
                    aria-label="Busyness"
                    defaultValue={10}
                    step={5}
                    max={50}
                    valueLabelDisplay="auto"
                    marks={[{value: 0, label: '0 miles'}, {value: 50, label: '50 miles'}]}
                />   
            </Box>
            <Box sx={{ width: 0.8 }}>
                <Box sx={{ display: 'flex', gap: 4}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel>Amenities</InputLabel>
                    <Select
                        id="amenities"
                        multiple
                        value={amenities}
                        onChange={handleAmenitiesChange}
                        label="Amenities"
                        renderValue={() => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {amenities.map((value) => (
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
                                <Checkbox checked={amenities.indexOf(amenity) > -1} />
                                <ListItemText primary={amenity} />
                            </MenuItem>
                          ))}
                    </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};