import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import './style.css';
import { filterMembers } from '../../actions/members';
import { getMembers } from '../../actions/members';

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
const initialState = { schoolYear: '', department: '', faculty: '', base: '', gender: '' };

const FilterMember = ({ sort, setSort }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  const handleClick = (e) => {
    if (isNaN(form.schoolYear)) {
      alert('Khóa phải là số');
    } else {
      dispatch(filterMembers(form, 1));
    }
  };

  useEffect(() => {
    dispatch(getMembers(1));
  }, []);

  return (
    <div>
      <div className="filter-title">
        <p>Lọc thành viên:</p>
        <FormControl className="sort" fullWidth size="small">
          <InputLabel id="sort">Sắp xếp theo</InputLabel>
          <Select labelId="sort" id="sort" value={sort} label="Sắp xếp theo" onChange={handleChangeSort}>
            <MenuItem value="point">Điểm cống hiến</MenuItem>
            <MenuItem value="department">Ban chuyên môn</MenuItem>
            <MenuItem value="schoolYear">Khóa</MenuItem>
            <MenuItem value="faculty">Khoa</MenuItem>
            <MenuItem value="">Không</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <div className="filter-form">
            <TextField className="input" size="small" name="schoolYear" variant="outlined" label="Khóa (chỉ ghi số)" onChange={handleChange} />
            <FormControl className="input" size="small">
              <InputLabel id="department">Ban chuyên môn</InputLabel>
              <Select labelId="department" id="department" label="Ban chuyên môn" name="department" defaultValue="" onChange={handleChange}>
                {department.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
                <MenuItem value="">Tất cả</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="input" size="small">
              <InputLabel id="faculty">Khoa</InputLabel>
              <Select labelId="faculty" id="faculty" label="Khoa" name="faculty" defaultValue="" onChange={handleChange}>
                {faculty.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
                <MenuItem value="">Tất cả</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="filter-form">
            <FormControl className="input" size="small">
              <InputLabel id="base">Học tại cơ sở</InputLabel>
              <Select labelId="base" id="base" label="Học tại cơ sở" name="base" defaultValue="" onChange={handleChange}>
                <MenuItem value="Dĩ An">Dĩ An</MenuItem>
                <MenuItem value="Lý Thường Kiệt">Lý Thường Kiệt</MenuItem>
                <MenuItem value="">Tất cả</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="input" size="small">
              <InputLabel id="gender">Giới tính</InputLabel>
              <Select labelId="gender" id="gender" label="Giới tính" name="gender" defaultValue="" onChange={handleChange}>
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Không muốn tiết lộ">Không muốn tiết lộ</MenuItem>
                <MenuItem value="">Tất cả</MenuItem>
              </Select>
            </FormControl>
            <Button className="input" variant="contained" fullWidth onClick={handleClick}>
              Lọc
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterMember;
