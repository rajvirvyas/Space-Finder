"use client"
import { useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import StudyCard from '../components/studycard';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  // temporary vals (will reset to this after leaving page, need to connect to database)
  const [name, setName] = useState('Temp Name');
  const [bio, setBio] = useState('This is a temporary bio. Feel free to edit!');
  const [pfp, setPhoto] = useState("/path/to/profile-picture.jpg");

  const toggleEditStatus = () => {
      setIsEditing(!isEditing);
  };
  const handleNameChange = (e) => {
      setName(e.target.value);
  };
  const handleBioChange = (e) => {
      setBio(e.target.value);
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
              required
              value={name} 
              inputProps={{ maxLength: 30 }}
              onChange={handleNameChange} 
              helperText="Max 30 characters"
            />
            <TextField 
              fullWidth
              multiline
              value={bio} 
              inputProps={{ maxLength: 500 }}
              onChange={handleBioChange} 
              helperText="Max 500 characters"
            />
            <Button onClick={toggleEditStatus} >
              Save
            </Button>
          </Box> ) : (
          <Box sx={{ p: 10, width: '50vw', display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
            <Typography variant="h3" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {bio}
            </Typography>
            <Button sx={{ width: '25vw' }} onClick={toggleEditStatus} >
              Edit Name/Bio
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