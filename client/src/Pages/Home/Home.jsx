import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ApplicationBar from '../../components/ApplicationBar/ApplicationBar';
import Sidebar from '../../components/SideBar/SideBar';
import Account from '../../components/Account/Account';
import Members from '../../components/Members/Members';
import Activities from '../../components/Activities/Activities';
import './style.css';

const renderTab = (tab) => {
  switch (tab) {
    case 0:
      return <Activities />;
    case 1:
      return <Account />;
    case 2:
      return <Members />;
    default:
      break;
  }
};

const Home = () => {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <ApplicationBar />
      <div className="home-container">
        <Grid container>
          <Grid item xs={12} sm={2}>
            <Sidebar tab={tab} setTab={setTab} />
          </Grid>
          <Grid item xs={12} sm={10}>
            {renderTab(tab)}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
