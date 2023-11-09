"use client"
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import StudyCard from '../components/studycard';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [pfp, setPhoto] = useState("/path/to/profile-picture.jpg");

  const toggleEditStatus = () => {
    setIsEditing(!isEditing);
  };
  const handleNameChange = (e) => {
    //edit name here
  };
  const handleBioChange = (e) => {
    //edit bio here
  };
  const handleSchoolChange = (e) => {
    // edit school here
  };
  const handlePFPChange = (e) => {
    const newImage = e.target.files[0];
    setPhoto(URL.createObjectURL(newImage));
  };
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

    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('/api/users', { method: 'get' })
            .then((response) => response.ok && response.json())
            .then(data => setUser(data));
    }, []);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', mb: -6 }}>
        <Box sx={{ p: 10 , display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <Avatar alt="Profile Picture" src={pfp} sx={{ width: 200, height: 200 }} />
          <Button component="label">
            Edit Profile Pic
            <input 
              type="file" 
              accept="image/*" 
              hidden
              onChange={handlePFPChange} />
          </Button>
        </Box>
        {isEditing ? ( 
          <Box sx={{ p: 10, width: '50vw', display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
            <TextField 
              fullWidth
              value={user.username} 
              inputProps={{ maxLength: 30 }}
              onChange={handleNameChange} 
              label='Name'
              helperText='Max 30 characters'
            />
            <TextField 
              fullWidth
              multiline
              value={user.bio} 
              inputProps={{ maxLength: 500 }}
              onChange={handleBioChange} 
              label='Bio'
              helperText='Max 500 characters'
            />
            <TextField 
              fullWidth
              multiline
              value={user.school} 
              inputProps={{ maxLength: 100 }}
              onChange={handleSchoolChange} 
              label='School'
              helperText='Max 100 characters'
            />
            <Button onClick={toggleEditStatus} >
              Save
            </Button>
          </Box> ) : (
          <Box sx={{ p: 10, width: '50vw', display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
            <Typography variant="h3" gutterBottom>
              {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Bio: {user.bio}
            </Typography>
            <Typography variant="body1" gutterBottom>
              School: {user.school}
            </Typography>
            <Button sx={{ width: '25vw' }} onClick={toggleEditStatus} >
              Edit Name/Bio/School
            </Button>
          </Box>
        )}
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