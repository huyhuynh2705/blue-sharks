import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import Activity from './Activity';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../actions/activities';
import { getUserInformationFromStorage } from '../../helper/index';

const Activities = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.activities);
  const userId = getUserInformationFromStorage().result._id;
  useEffect(() => {
    dispatch(getActivities(1));
  }, []);

  return !data.isLoading ? (
    <div className="activities">
      <Grid container>
        <Grid item xs={12} sm={12} md={9}>
          {data.activities.length ? data.activities.map((item) => <Activity data={item} key={item._id} userId={userId} />) : <p>Không có hoạt động</p>}
        </Grid>
        <Grid className="calendar" item xs={12} sm={12} md={3}>
          <Calendar />
        </Grid>
      </Grid>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Activities;
