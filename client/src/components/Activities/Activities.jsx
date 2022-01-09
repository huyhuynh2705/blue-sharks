import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Activity from './Activity';
import { Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getMoreActivities } from '../../actions/activities';
import { getUserInformationFromStorage } from '../../helper/index';
import NewActivity from '../NewActivity/NewActivity';
import UpdateActivity from '../NewActivity/UpdateActivity';
import InfiniteScroll from 'react-infinite-scroll-component';

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
        <InfiniteScroll
          dataLength={data.activities.length}
          next={fetchMoreActivities}
          hasMore={data.hasMore}
          loader={
            data.isLoading ? (
              ''
            ) : (
              <div style={{ margin: '10px 0px' }}>
                <CircularProgress />
              </div>
            )
          }
        >
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
                      <Activity
                        data={item}
                        key={item._id}
                        isLoadingJoin={data.isLoadingJoin}
                        activityJoinId={data.activityJoinId}
                        userId={userId}
                        setUpdateActivity={setUpdateActivity}
                        setUpdateActivityId={setUpdateActivityId}
                      />
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
        </InfiniteScroll>
      </div>
    );
  };

  const fetchMoreActivities = () => {
    dispatch(getMoreActivities(data.activities.length));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setNewActivity(true);
  };

  useEffect(() => {
    dispatch(getActivities());
  }, []);
  return renderContent(newActivity, updateActivity, data, setNewActivity, setUpdateActivity);
};

export default Activities;
