import React, { useState } from 'react';
import ApplicationBar from '../../components/ApplicationBar/ApplicationBar';
import Sidebar from '../../components/SideBar/SideBar';
import Account from '../../components/Account/Account';
import Members from '../../components/Members/Members';
import Activities from '../../components/Activities/Activities';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
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
        <div className="sidebar-container">
          <Sidebar tab={tab} setTab={setTab} />
        </div>
        <div className="content-container">{renderTab(tab)}</div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Home;
