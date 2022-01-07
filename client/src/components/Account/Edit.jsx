import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './style.css';

import { updateMember } from '../../actions/auth';

const faculty = [
  'Cơ Khí',
  'Công Nghệ Vật Liệu',
  'Điện - Điện Tử',
  'Khoa Học Ứng Dụng',
  'Khoa Học và Kỹ Thuật Máy Tính',
  'Kỹ Thuật Địa Chất và Dầu Khí',
  'Kỹ Thuật Giao Thông',
  'Kỹ Thuật Hóa Học',
  'Kỹ Thuật Xây Dựng',
  'Môi Trường và Tài Nguyên',
  'OISP',
  'PFIEV',
  'Quản Lý Công Nghiệp',
];

const department = ['Nhân Sự', 'Truyền Thông - Thiết Kế', 'Sự Kiện', 'Kinh Doanh', 'Hậu Cần', 'Cố Vấn'];

const Edit = ({ setEdit, data }) => {
  const initialState = {
    id: data._id,
    address: data.address,
    base: data.base,
    department: data.department,
    dob: data.dob,
    email: data.email,
    facebook: data.facebook,
    faculty: data.faculty,
    fullName: data.fullName,
    gender: data.gender,
    joinDate: data.joinDate,
    phoneNumber: data.phoneNumber,
    schoolYear: data.schoolYear,
    studentId: data.studentId,
    role: data.role,
    homeTown: data.homeTown,
    transport: data.transport,
    username: data.username,
    password: '',
  };
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    setEdit(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMember(form, setEdit));
  };

  return (
    <div className="edit">
      <h3>Thông tin cá nhân</h3>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ margin: '10px 0px' }}
              name="fullName"
              variant="outlined"
              label="Họ và tên"
              defaultValue={data.fullName}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="studentId"
              variant="outlined"
              label="Mã số sinh viên"
              defaultValue={data.studentId}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="schoolYear"
              variant="outlined"
              type="number"
              label="Khóa (chỉ ghi số)"
              defaultValue={data.schoolYear}
              fullWidth
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="faculty">Khoa</InputLabel>
              <Select
                style={{ marginBottom: '10px' }}
                labelId="faculty"
                id="faculty"
                label="Khoa"
                name="faculty"
                defaultValue={data.faculty}
                onChange={handleChange}
              >
                {faculty.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              style={{ marginBottom: '10px' }}
              name="dob"
              variant="outlined"
              label="Ngày sinh (dd/mm/yyyy)"
              defaultValue={data.dob}
              fullWidth
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="gender">Giới tính</InputLabel>
              <Select
                style={{ marginBottom: '10px' }}
                labelId="gender"
                id="gender"
                label="Giới tính"
                name="gender"
                defaultValue={data.gender}
                onChange={handleChange}
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Không muốn tiết lộ">Không muốn tiết lộ</MenuItem>
              </Select>
            </FormControl>
            <TextField
              style={{ marginBottom: '10px' }}
              name="address"
              variant="outlined"
              label="Địa chỉ ở TP.HCM"
              defaultValue={data.address}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="homeTown"
              variant="outlined"
              label="Quê quán"
              defaultValue={data.homeTown}
              fullWidth
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="base">Học tại cơ sở</InputLabel>
              <Select
                style={{ marginBottom: '10px' }}
                labelId="base"
                id="base"
                label="Học tại cơ sở"
                name="base"
                defaultValue={data.base}
                onChange={handleChange}
              >
                <MenuItem value="Dĩ An">Dĩ An</MenuItem>
                <MenuItem value="Lý Thường Kiệt">Lý Thường Kiệt</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="department">Ban chuyên môn</InputLabel>
              <Select
                style={{ margin: '10px 0px' }}
                labelId="department"
                id="department"
                label="Ban chuyên môn"
                name="department"
                defaultValue={data.department}
                onChange={handleChange}
              >
                {department.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="role">Vai trò</InputLabel>
              <Select style={{ marginBottom: '10px' }} labelId="role" id="role" label="Vai trò" name="role" defaultValue={data.role} onChange={handleChange}>
                <MenuItem value="Thành viên">Thành viên</MenuItem>
                <MenuItem value="Phó ban">Phó ban</MenuItem>
                <MenuItem value="Trưởng ban">Trưởng ban</MenuItem>
              </Select>
            </FormControl>
            <TextField
              style={{ marginBottom: '10px' }}
              name="joinDate"
              variant="outlined"
              label="Ngày tham gia Ban Điều Hành (dd/mm/yyyy)"
              defaultValue={data.joinDate}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="transport"
              variant="outlined"
              label="Phương tiện di chuyển"
              defaultValue={data.transport}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="facebook"
              variant="outlined"
              label="Link Facebook"
              defaultValue={data.facebook}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="phoneNumber"
              variant="outlined"
              label="Số điện thoại"
              defaultValue={data.phoneNumber}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="email"
              variant="outlined"
              label="Email cá nhân"
              defaultValue={data.email}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              style={{ marginBottom: '10px' }}
              name="username"
              variant="outlined"
              label="Tên đăng nhập"
              defaultValue={data.username}
              fullWidth
              onChange={handleChange}
            />
            <TextField style={{ marginBottom: '10px' }} name="password" variant="outlined" label="Mật khẩu" fullWidth onChange={handleChange} />
          </Grid>
        </Grid>
        <div className="btn-container">
          <Button variant="contained" color="error" className="btn" onClick={handleClick}>
            Hủy
          </Button>
          <Button variant="contained" className="btn" type="submit">
            Xong
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
