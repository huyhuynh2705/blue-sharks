import React from 'react';
import { Button, Grid } from '@mui/material';
import './style.css';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const dateFormatter = (date) => {
  return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
};

const reduceDepartmentName = (name) => {
  const words = name.split(' ');
  return words.map((word) => word[0]).join('');
};

const Activity = ({ data, userId }) => {
  const handleClick = () => {
    window.open(data.facebookLink, '_blank');
  };

  const handleJoin = () => {};
  return (
    <div style={{ background: '#ffffff' }}>
      <Grid className="activity" container>
        <Grid item xs={12} sm={9}>
          <div className="content">
            <h4>[{data.title}]</h4>
            <h5>
              {dateFormatter(data.dateCreated)} - {data.creatorId.fullName} - K{data.creatorId.schoolYear} - {reduceDepartmentName(data.creatorId.department)}
            </h5>
            <p>{data.content}</p>
            <p className="link" onClick={handleClick}>
              Link bài đăng trên Facebook
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="action-container">
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
              <div className="flex">
                <PeopleAltIcon />
                <p>
                  <span>Người tham gia: </span>
                  {data.participants.length}
                </p>
              </div>
            </div>
            {data.participants.includes(userId) ? (
              <Button className="btn" variant="contained" color="error" fullWidth onClick={handleJoin}>
                Hủy tham gia
              </Button>
            ) : (
              <Button className="btn" variant="contained" fullWidth onClick={handleJoin}>
                Tham gia
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Activity;
