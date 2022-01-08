import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import './style.css';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';
import { getParticipants } from '../../actions/participants';

function createData(id, fullName, schoolYear, department, phoneNumber) {
  return {
    id,
    fullName,
    schoolYear,
    department,
    phoneNumber,
  };
}

const reduceDepartmentName = (name) => {
  const words = name.split(' ');
  return words.map((word) => word[0]).join('');
};

const Participants = ({ participants, setOpenParticipants, openParticipants }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.participants);

  const rows = [];
  for (const item of data.participants) {
    rows.push(createData(item._id, item.fullName, item.schoolYear, item.department, item.phoneNumber));
  }

  const handleClick = () => {
    setOpenParticipants(false);
  };

  useEffect(() => {
    dispatch(getParticipants(participants));
  }, [participants, dispatch]);

  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openParticipants}>
      <div className="participants">
        {!data.isLoading ? (
          <>
            <div className="title">
              <Button size="small" variant="outlined">
                <DownloadIcon />
              </Button>
              <div>
                <h4>Người tham gia: {participants.length}</h4>
              </div>
              <Button size="small" color="error" variant="outlined" onClick={handleClick}>
                <CloseIcon />
              </Button>
            </div>
            <div className="table-members">
              {rows.length ? (
                <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>Khóa</th>
                      <th>Ban</th>
                      <th>Điện thoại</th>
                    </tr>
                    {rows.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.fullName}</td>
                        <td>{row.schoolYear}</td>
                        <td>{reduceDepartmentName(row.department)}</td>
                        <td>{row.phoneNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="loading">
                  <p>Không có người tham gia</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </div>
    </Backdrop>
  );
};

export default Participants;
