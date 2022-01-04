import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMembers } from '../../actions/members';
import Detail from './Detail';
import Table from './Table';

const Members = () => {
  const [idDetail, setIdDetail] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.members.members);

  useEffect(() => {
    dispatch(getMembers(1));
  }, []);

  return idDetail === '' ? (
    <div className="members">
      <Table data={data} setIdDetail={setIdDetail} />
    </div>
  ) : (
    <Detail members={data} idDetail={idDetail} setIdDetail={setIdDetail} />
  );
};

export default Members;
