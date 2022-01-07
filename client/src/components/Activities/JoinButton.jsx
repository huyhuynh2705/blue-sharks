import React from 'react';
import { Button } from '@mui/material';
import { joinActivity } from '../../actions/activities';
import { useDispatch } from 'react-redux';

const JoinButton = ({ color, text, activityId }) => {
  const dispatch = useDispatch();
  const handleJoin = () => {
    dispatch(joinActivity(activityId));
  };
  return (
    <Button variant="contained" color={color} fullWidth onClick={handleJoin}>
      {text}
    </Button>
  );
};

export default JoinButton;
