import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ApplicationBar from '../../components/ApplicationBar/ApplicationBar';
import Sidebar from '../../components/SideBar/SideBar';
import Account from '../../components/Account/Account';
import Members from '../../components/Members/Members';
import Traditional from '../../components/Traditional/Traditional';

const renderTab = (tab) => {
  switch (tab) {
    case 0:
      return <Traditional />;
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
      <Grid container>
        <Grid item xs={2}>
          <Sidebar tab={tab} setTab={setTab} />
        </Grid>
        <Grid item xs={10}>
          {renderTab(tab)}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
