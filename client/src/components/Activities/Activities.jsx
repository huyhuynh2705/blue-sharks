import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Activity from './Activity';
import { Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../actions/activities';
import { getUserInformationFromStorage } from '../../helper/index';
import NewActivity from '../NewActivity/NewActivity';
import UpdateActivity from '../NewActivity/UpdateActivity';

const Activities = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.activities);
  const [newActivity, setNewActivity] = useState(false);
  const [updateActivity, setUpdateActivity] = useState(false);
  const [updateActivityId, setUpdateActivityId] = useState('');
  const userId = getUserInformationFromStorage().result._id;

  const renderContent = (newActivity, updateActivity, data) => {
    if (newActivity) {
      return <NewActivity setNewActivity={setNewActivity} />;
    }
    if (updateActivity) {
      return <UpdateActivity data={data.activities.filter((d) => d._id === updateActivityId)[0]} setUpdateActivity={setUpdateActivity} />;
    }
    return (
      <div className="activities">
        <Grid container>
          <Grid item xs={12} sm={12} md={9}>
            <div className="btn">
              <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
                + Hoạt động mới
              </Button>
            </div>
            {!data.isLoading ? (
              <>
                {data.activities.length ? (
                  data.activities.map((item) => (
                    <Activity data={item} key={item._id} userId={userId} setUpdateActivity={setUpdateActivity} setUpdateActivityId={setUpdateActivityId} />
                  ))
                ) : (
                  <p>Không có hoạt động</p>
                )}
              </>
            ) : (
              <div className="loading">
                <CircularProgress />
              </div>
            )}
          </Grid>
          <Grid className="calendar" item xs={12} sm={12} md={3}>
            <Calendar />
          </Grid>
        </Grid>
      </div>
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    setNewActivity(true);
  };
  useEffect(() => {
    dispatch(getActivities(1));
  }, []);

  return renderContent(newActivity, updateActivity, data, setNewActivity, setUpdateActivity);

  // return newActivity ? (
  //   <NewActivity setNewActivity={setNewActivity} />
  // ) : !data.isLoading ? (
  //   <div className="activities">
  //     <Grid container>
  //       <Grid item xs={12} sm={12} md={9}>
  //         <Button className="btn" variant="contained" color="primary" onClick={handleClick}>
  //           + Hoạt động mới
  //         </Button>
  //         {data.activities.length ? data.activities.map((item) => <Activity data={item} key={item._id} userId={userId} />) : <p>Không có hoạt động</p>}
  //       </Grid>
  //       <Grid className="calendar" item xs={12} sm={12} md={3}>
  //         <Calendar />
  //       </Grid>
  //     </Grid>
  //   </div>
  // ) : (
  //   <CircularProgress />
  // );
};

export default Activities;
