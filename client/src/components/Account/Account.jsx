import React, { useState } from 'react';
import Detail from './Detail';
import Edit from './Edit';
import { getUserInformationFromStorage } from '../../helper/index.js';

const Account = () => {
  const [edit, setEdit] = useState(false);
  const data = getUserInformationFromStorage().result;
  return edit ? (
    <Edit setEdit={setEdit} data={data} />
  ) : (
    <Detail setEdit={setEdit} data={data} />
  );
};

export default Account;
