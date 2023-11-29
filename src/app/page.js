"use client"
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Filter from './components/filter';
import StudyCard from './components/studycard';

export default function Home() {
  const [dbStudies, setdbStudies] = useState([]);
  const [studies, setStudies] = useState([]);
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState({lat: 35.3050, lng: -120.6625});

  function onRatingChange(event) {
    setRating(event.target.value);
    let newStudies = dbStudies.filter((study) => study.avgRating >= event.target.value);
    setStudies(newStudies);
  }

  function onCapChange(event) {
    let newStudies = dbStudies.filter((study) => study.capacity >= event.target.value);
    setStudies(newStudies);
  }

  function onSearchChange(event) {
    setSearch(event.target.value);
    let newStudies = dbStudies.filter((study) => study.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setStudies(newStudies);
  }

  function onProxChange(event) {
    let newStudies = dbStudies.filter((study) => 
    getDistance(location.lat, location.lng, study.latitude, study.longitude) <= event.target.value);
    setStudies(newStudies);
  }

  function getDistance(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d * 0.621371;
    }

    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

  useEffect(() => {
    fetch('/api/study-spaces', { method: 'GET', })
      .then((response) => response.ok && response.json())
      .then((data) => {
        setdbStudies(data);
        setStudies(data);
      });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }, (error) => {
          console.log(error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: "space-between", p: 1 }}>
        <Filter search={search} rating={rating} 
        onSearchChange={onSearchChange} onRatingChange={onRatingChange}
        onProxChange={onProxChange} onCapChange={onCapChange}/>
        <Box sx={{ display: "flex", justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center',
                    overflow: 'scroll', maxHeight: '85vh' }}>
          {studies.map((study, index) => (
            <StudyCard key={index} id={study.id} studyName={study.name}
              liveStatus={study.liveStatus} rating={study.avgRating} image={study.img} />
          ))}
        </Box>
      </Box>
    </>
  )
}
