import React from 'react';
import { Grid, Button } from '@mui/material';
import './style.css';

const Detail = ({ setEdit, data }) => {
  const handleClick = (event) => {
    event.preventDefault();
    setEdit(true);
  };

  return (
    <div className="detail">
      <h3>Thông tin cá nhân</h3>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <p>Họ và tên: {data.fullName}</p>
          <p>Mã số sinh viên: {data.studentId}</p>
          <p>Khóa: K{data.schoolYear}</p>
          <p>Khoa: {data.faculty}</p>
          <p>Ngày sinh: {data.dob}</p>
          <p>Giới tính: {data.gender}</p>
          <p>Quê quán: {data.homeTown}</p>
          <p>Số điện thoại: {data.phoneNumber}</p>
          <p>Email cá nhân: {data.email}</p>
          <p>Học tại cơ sở : {data.base}</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p>Ban chuyên môn: {data.department}</p>
          <p>Ngày tham gia Ban Điều Hành: {data.joinDate}</p>
          <p>Vai trò: {data.role}</p>
          <p>Địa chỉ ở TP.HCM: {data.address}</p>
          <p>Phương tiện di chuyển: {data.transport}</p>
          <p>Link Facebook: {data.facebook}</p>
          <p>Tên đăng nhập: {data.username}</p>
        </Grid>
      </Grid>
      <Button variant="contained" className="btn" onClick={handleClick}>
        Chỉnh sửa
      </Button>
    </div>
  );
};

export default Detail;
