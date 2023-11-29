"use client"
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import Filter from './components/filter';
import StudyCard from './components/studycard';
import { useJsApiLoader } from '@react-google-maps/api'

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const [dbStudies, setdbStudies] = useState([]);
  const [studies, setStudies] = useState([]);
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState({lat: 0, long: 0});
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['geometry']
})

  function onRatingChange(event) {
    setRating(event.target.value);
    let newStudies = dbStudies.filter((study) => study.avgRating >= event.target.value);
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

  function getDistance(lat1, lon1, lat2, lon2) {
    if(isLoaded) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lon1),
      new google.maps.LatLng(lat2, lon2)) / 1609.34;
      return dist;
    }
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
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3);
    }
  };

  const handleNext = () => {
    if (startIndex < studies.length - 3) {
      setStartIndex(startIndex + 3);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: "space-between", p: 1 }}>
        <Filter search={search} rating={rating} 
        onSearchChange={onSearchChange} onRatingChange={onRatingChange}
        onProxChange={onProxChange}/>
        <Box sx={{ display: "flex", justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center',
                    overflow: 'scroll', maxHeight: '85vh' }}>
          {studies.map((study, index) => (
            <StudyCard key={index} id={study.id} studyName={study.name}
              liveStatus={study.liveStatus} rating={study.avgRating} image={study.img} />
          ))}
          {/* <IconButton onClick={handlePrev} disabled={startIndex === 0}>
            <ArrowBackIosNew />
          </IconButton>
          {studies.slice(startIndex, startIndex + 3).map((study, index) => (
            <StudyCard key={index} id={study.id} studyName={study.name} 
            liveStatus={study.liveStatus} rating={study.avgRating} image={study.img} />
          ))}
          <IconButton onClick={handleNext} disabled={startIndex >= studies.length - 3}>
            <ArrowForwardIos />
          </IconButton> */}
        </Box>
      </Box>
    </>
  )
}
