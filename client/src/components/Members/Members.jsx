import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import Detail from './Detail';
import Table from './Table';
import FilterMember from '../FilterMember/FilterMember';

const Members = () => {
  const [idDetail, setIdDetail] = useState('');
  const data = useSelector((state) => state.members);

  return idDetail === '' ? (
    <div className="members">
      <FilterMember />
      {!data.isLoading ? <Table data={data.members} setIdDetail={setIdDetail} /> : <CircularProgress />}
    </div>
  ) : (
    <>{!data.isLoading ? <Detail members={data.members} idDetail={idDetail} setIdDetail={setIdDetail} /> : <CircularProgress />}</>
  );
};

export default Members;
