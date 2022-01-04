import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import './style.css';

const SideBar = ({ tab, setTab }) => {
  return (
    <div className="sidebar">
      <div className="tab" style={tab === 0 ? { backgroundColor: '#daeffe' } : {}} onClick={() => setTab(0)}>
        <EventAvailableIcon />
        <p>Hoạt động</p>
      </div>
      <div className="tab" style={tab === 1 ? { backgroundColor: '#daeffe' } : {}} onClick={() => setTab(1)}>
        <AccountCircleIcon />
        <p>Cá nhân</p>
      </div>
      <div className="tab" style={tab === 2 ? { backgroundColor: '#daeffe' } : {}} onClick={() => setTab(2)}>
        <PeopleAltIcon />
        <p>Thành viên BĐH</p>
      </div>
    </div>
  );
};

export default SideBar;
