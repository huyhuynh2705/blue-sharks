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

const dateFormatter = (date) => {
  return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
};

const reduceDepartmentName = (name) => {
  const words = name.split(' ');
  return words.map((word) => word[0]).join('');
};

const Activity = ({ data, userId, setUpdateActivity, setUpdateActivityId }) => {
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

  return (
    <div style={{ background: '#ffffff' }}>
      <div className="activity">
        <div className="title">
          <div>
            <h4>
              [{data.title}] - <span>{dateFormatter(data.dateCreated)}</span>
            </h4>
            <h5>
              {data.creatorId.fullName} - K{data.creatorId.schoolYear} - {reduceDepartmentName(data.creatorId.department)}
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
        <p className="content" dangerouslySetInnerHTML={{ __html: data.content }}></p>
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
        {data.participants.includes(userId) ? (
          <JoinButton color={'error'} text={'Hủy tham gia'} expireDate={data.expireDate} activityId={data._id} />
        ) : (
          <JoinButton color={'primary'} text={'Tham gia'} expireDate={data.expireDate} activityId={data._id} />
        )}
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
