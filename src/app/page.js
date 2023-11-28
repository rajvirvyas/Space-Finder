"use client"
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import Filter from './components/filter';
import StudyCard from './components/studycard';

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const [dbStudies, setdbStudies] = useState([]);
  const [studies, setStudies] = useState([]);
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(0);

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

  useEffect(() => {
    fetch('/api/study-spaces', { method: 'GET', })
      .then((response) => response.ok && response.json())
      .then((data) => {
        setdbStudies(data);
        setStudies(data);
      });
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
        <Filter search={search} rating={rating} onSearchChange={onSearchChange} onRatingChange={onRatingChange}/>
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
