import React from 'react';
import { Button } from '@mui/material';
import { joinActivity } from '../../actions/activities';
import { useDispatch } from 'react-redux';

const isExpire = (expireDate) => {
  if (new Date(expireDate.slice(0, 4), expireDate.slice(5, 7) - 1, expireDate.slice(8, 10)) < new Date().getTime()) return true;
  return false;
};

const JoinButton = ({ color, text, activityId, expireDate }) => {
  const dispatch = useDispatch();
  const handleJoin = () => {
    dispatch(joinActivity(activityId));
  };
  return !isExpire(expireDate) ? (
    <Button variant="contained" color={color} fullWidth onClick={handleJoin}>
      {text}
    </Button>
  ) : (
    <Button variant="contained" color={color} disabled fullWidth onClick={handleJoin}>
      Hết hạn tham gia
    </Button>
  );
};

export default JoinButton;
