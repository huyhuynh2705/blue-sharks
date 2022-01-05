import React from 'react';
import Calendar from 'react-calendar';
import Activity from './Activity';
import { Grid } from '@mui/material';
import 'react-calendar/dist/Calendar.css';

const Activities = () => {
  return (
    <div className="activities">
      <Grid container>
        <Grid item xs={12} sm={12} md={9}>
          <Activity />
          <Activity />
          <Activity />
          <Activity />
        </Grid>
        <Grid className="calendar" item xs={12} sm={12} md={3}>
          <Calendar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Activities;
