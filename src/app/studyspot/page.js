"use client"
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Divider,
  Slider,
  Paper,
  Grid,
  fabClasses,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Avatar from '@mui/material/Avatar';
import StudyCard from '../components/studycard';
import Comments from './comments';
import AmenitiesList from './amenitiesList';

function StudySpot(props) {
  const loggedIn = false; // Replace with a field passed through props

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" gutterBottom>
                Frank E. Pilling Room 103
              </Typography>
              <Typography variant="body1" gutterBottom>
                1234 Cal Poly Way
              </Typography>
              <Typography variant="body1" gutterBottom>
                School: Cal Poly SLO
              </Typography>
              {loggedIn ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Button variant="outlined" color="primary" width="200px" href="#">
                    Rate
                  </Button>
                  <Button variant="outlined" color="primary" href="#">
                    Report
                  </Button>
                </Box>
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Alert severity="warning">Must be signed in to Rate or Report</Alert>
                  <Button disabled>Rate</Button>
                  <Button disabled>Report</Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Box p={2} sx={{ height: '16.7em', bgcolor: 'grey.500', borderRadius: 1}}>
              {/* Your map component */}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        <Divider orientation="horizontal" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" component="h3">
                Comments
              </Typography>
              <Comments />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" component="h3">
                Amenities
              </Typography>
              <AmenitiesList />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        <Divider orientation="horizontal" />
      </Box>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h4" component="h3">
            Busyness
          </Typography>
          <Slider
            aria-label="Rating"
            size="medium"
            defaultValue={2}
            step={1}
            min={0}
            max={5}
            marks={[{ value: 0, label: '0' }, { value: 5, label: '5' }]}
            valueLabelDisplay="auto"
          />
          <Box mt={2}>
            <Typography variant="h4" component="h3">
              Trends
            </Typography>
          </Box>
          <BarChart
            xAxis={[
              {
                id: 'Time',
                data: ['1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'],
                scaleType: 'band',
              },
            ]}
            series={[
              {
                data: [20, 33, 81, 45, 21, 76],
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default StudySpot;
