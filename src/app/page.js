"use client"
import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import Filter from './components/filter';
import StudyCard from './components/studycard';

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const studies = [
    { studyName: "Study 1", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 2", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 3", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 4", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 5", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 6", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 7", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 8", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 9", liveStatus: "Busy AF", rating: 4.5 },
    { studyName: "Study 10", liveStatus: "Busy AF", rating: 4.5 }
  ];

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 2);
    }
  };

  const handleNext = () => {
    if (startIndex < studies.length - 2) {
      setStartIndex(startIndex + 2);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: "space-between", p: 2 }}>
        <Filter />
        <Box sx={{ display: "flex", justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center' }}>
          <IconButton onClick={handlePrev} disabled={startIndex === 0}>
            <ArrowBackIosNew />
          </IconButton>
          {studies.slice(startIndex, startIndex + 2).map((study, index) => (
            <StudyCard key={index} studyName={study.studyName} liveStatus={study.liveStatus} rating={study.rating} />
          ))}
          <IconButton onClick={handleNext} disabled={startIndex >= studies.length - 2}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
