import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import './style.css';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import JoinButton from './JoinButton';
import MenuIcon from '@mui/icons-material/Menu';
import { deleteActivity } from '../../actions/activities';
import { useDispatch } from 'react-redux';
import Participants from '../Participants/Participants';
import CircularProgress from '@mui/material/CircularProgress';

const dateFormatter = (date) => {
  return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
};

const reduceDepartmentName = (name) => {
  const words = name.split(' ');
  return words.map((word) => word[0]).join('');
};

const renderButton = (isLoadingJoin, activityId, activityJoinId, includesUserId, expireDate, _id) => {
  if (isLoadingJoin && activityJoinId === activityId) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }
  if (includesUserId) {
    return <JoinButton color={'error'} text={'Hủy tham gia'} expireDate={expireDate} activityId={_id} />;
  }
  return <JoinButton color={'primary'} text={'Tham gia'} expireDate={expireDate} activityId={_id} />;
};

const Activity = ({ data, userId, isLoadingJoin, activityJoinId, setUpdateActivity, setUpdateActivityId }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    window.open(data.facebookLink, '_blank');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [openParticipants, setOpenParticipants] = useState(false);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUpdate = () => {
    setUpdateActivity(true);
    setUpdateActivityId(data._id);
  };
  const handleDelete = () => {
    if (window.confirm('Xóa hoạt động?')) {
      dispatch(deleteActivity(data._id));
    }
  };

  const handleViewMore = () => {
    const content = document.querySelector('#content');
    content.style.maxHeight = content.style.maxHeight === '2000px' ? '300px' : '2000px';
  };

  return (
    <div style={{ background: '#ffffff' }}>
      <div className="activity">
        <div className="title">
          <div style={{ width: '100%' }} onClick={handleViewMore}>
            <h4>[{data.title}]</h4>
            <h5>
              {data.creatorId.fullName} - K{data.creatorId.schoolYear} - {reduceDepartmentName(data.creatorId.department)} - {dateFormatter(data.dateCreated)}
            </h5>
          </div>
          {userId === data.creatorId._id ? (
            <div>
              <Button onClick={handleOpen}>
                <MenuIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleUpdate}>Chỉnh sửa</MenuItem>
                <MenuItem onClick={handleDelete}>Xóa</MenuItem>
                <MenuItem onClick={handleClose}>Đóng</MenuItem>
              </Menu>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <p className="content" id="content" dangerouslySetInnerHTML={{ __html: data.content }}></p>
        <p className="link" onClick={handleClick}>
          Link bài đăng trên Facebook
        </p>
        <div className="action">
          <div className="flex">
            <EventBusyIcon />
            <p>
              <span>Hết hạn: </span>
              {dateFormatter(data.expireDate)}
            </p>
          </div>
          <div className="flex">
            <EmojiEventsIcon />
            <p>
              <span>Điểm cống hiến: </span>
              {data.point}
            </p>
          </div>
          <div className="flex text-button" onClick={() => setOpenParticipants(true)}>
            <PeopleAltIcon />
            <p>
              <span>Người tham gia: </span>
              {data.participants.length}
            </p>
          </div>
        </div>
        {renderButton(isLoadingJoin, data._id, activityJoinId, data.participants.includes(userId), data.expireDate, data._id)}
      </div>
      {openParticipants ? (
        <Participants participants={data.participants} openParticipants={openParticipants} setOpenParticipants={setOpenParticipants} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Activity;
