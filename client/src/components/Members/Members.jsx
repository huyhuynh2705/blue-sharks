import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import { getMembers } from '../../actions/members';
import Detail from './Detail';
import Table from './Table';

const Members = () => {
  const [idDetail, setIdDetail] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(getMembers(1));
  }, []);

  return idDetail === '' ? (
    <div className="members">{!data.isLoading ? <Table data={data.members} setIdDetail={setIdDetail} /> : <CircularProgress />}</div>
  ) : (
    <>{!data.isLoading ? <Detail members={data.members} idDetail={idDetail} setIdDetail={setIdDetail} /> : <CircularProgress />}</>
  );
};

export default Members;
