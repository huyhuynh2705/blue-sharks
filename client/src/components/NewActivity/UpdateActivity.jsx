import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './style.css';
import { updateActivity } from '../../actions/activities';
import { useDispatch } from 'react-redux';

const dateFormatter = (date) => {
  return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
};

const validateForm = (form) => {
  if (form.title.length < 3 || form.content.length < 3 || form.title.length > 500 || form.content.length > 500) {
    alert('Tiêu đề và Nội dung phải từ 3-500 ký tự.');
    return false;
  }
  if (isNaN(form.point) || Number(form.point) < 0 || Number(form.point) > 5) {
    alert('Điểm cống hiến từ 0-5.');
    return false;
  }
  if (form.expireDate.length !== 10) {
    alert('Sai định dạng ngày.');
    return false;
  }
  return true;
};

const UpdateActivity = ({ setUpdateActivity, data }) => {
  const initialState = {
    title: data.title,
    content: data.content,
    facebookLink: data.facebookLink,
    point: data.point,
    expireDate: dateFormatter(data.expireDate),
  };
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      dispatch(updateActivity(data._id, form, setUpdateActivity));
    }
  };
  return (
    <div className="newactivity">
      <p>Chỉnh sửa hoạt động</p>
      <form onSubmit={handleSubmit}>
        <TextField className="input" defaultValue={form.title} required name="title" variant="outlined" label="Tiêu đề" fullWidth onChange={handleChange} />
        <TextField
          className="input"
          defaultValue={form.content}
          required
          name="content"
          variant="outlined"
          label="Nội dung"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          className="input"
          defaultValue={form.facebookLink}
          required
          name="facebookLink"
          variant="outlined"
          label="Link Facebook"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          className="input"
          defaultValue={form.point}
          required
          type="number"
          name="point"
          variant="outlined"
          label="Điểm cống hiến"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          className="input"
          defaultValue={form.expireDate}
          required
          name="expireDate"
          variant="outlined"
          label="Ngày hết hạn đăng ký (dd/mm/yyyy)"
          fullWidth
          onChange={handleChange}
        />
        <div className="btn-container">
          <Button className="btn" variant="contained" color="error" onClick={() => setUpdateActivity(false)}>
            Hủy
          </Button>
          <Button className="btn" variant="contained" color="primary" type="submit">
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateActivity;
