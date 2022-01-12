import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { sortMembers } from '../../helper/index';

import Detail from './Detail';
import Table from './Table';
import FilterMember from '../FilterMember/FilterMember';

const Members = () => {
  const [idDetail, setIdDetail] = useState('');
  const [sort, setSort] = useState('');

  const data = useSelector((state) => state.members);

  return idDetail === '' ? (
    <div className="members">
      <FilterMember sort={sort} setSort={setSort} />
      {!data.isLoading ? <Table data={sortMembers(data.members, sort)} setIdDetail={setIdDetail} /> : <CircularProgress />}
    </div>
  ) : (
    <>{!data.isLoading ? <Detail members={data.members} idDetail={idDetail} setIdDetail={setIdDetail} /> : <CircularProgress />}</>
  );
};

export default Members;
