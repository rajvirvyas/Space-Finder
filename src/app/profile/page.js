"use client"
import { useState } from 'react';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import StudyCard from '../components/studycard';

export default function Profile() {
    const [recentSpots, setRecentSpots] = useState([
        {
            id: 1,
            name: 'Library',
        },
        {
            id: 2,
            name: 'Study Room',
        },
        {
            id: 3,
            name: 'Coffee Shop',
        }
    ]);

    return (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', mb: -6 }}>
            <Box sx={{ p: 10 }}>
                <Avatar alt="Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 200, height: 200 }} />
            </Box>
            <Box sx={{ p: 10 }}>
                <Typography variant="h4" gutterBottom>
                    John Doe
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien quis bibendum bibendum, elit sapien bibendum ipsum, vel bibendum sapien sapien vel sapien.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    School: Cal Poly SLO
                </Typography>
            </Box>
        </Box>
        <Box>
            <Typography sx={{m: 6, fontSize: 24}}>
                Recent Study Spots
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
                {recentSpots.map(spot => (
                    <StudyCard key={spot.id} studyName={spot.name} liveStatus={"Busy AF"} rating={4.5} />
                ))}
            </Box>
        </Box>
        </>
        
    )
}
