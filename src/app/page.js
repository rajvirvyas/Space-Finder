"use client"
import StudyCard from './components/studycard'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: 'flex-start', flexWrap: 'wrap'}}>
        <StudyCard studyName={"Study 1"} liveStatus={"Busy AF"} rating={4.5}/>
        <StudyCard studyName={"Study 2"} liveStatus={"Busy AF"} rating={4.5}/>
        <StudyCard studyName={"Study 3"} liveStatus={"Busy AF"} rating={4.5}/>
        <StudyCard studyName={"Study 4"} liveStatus={"Busy AF"} rating={4.5}/>
      </Box>
    </>
  )
}
