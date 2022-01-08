import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './style.css';
import { createActivity } from '../../actions/activities';
import { useDispatch } from 'react-redux';

const initialState = { title: '', content: '', facebookLink: '', point: '', expireDate: '' };

const validateForm = (form) => {
  if (form.title.length < 3 || form.content.length < 3 || form.title.length > 500 || form.content.length > 1000) {
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

const NewActivity = ({ setNewActivity }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      dispatch(createActivity(form, setNewActivity));
    }
  };
  return (
    <div className="newactivity">
      <p>Hoạt động mới</p>
      <form onSubmit={handleSubmit}>
        <TextField className="input" required name="title" variant="outlined" label="Tiêu đề" fullWidth onChange={handleChange} />
        <TextField className="input" multiline rows={4} required name="content" variant="outlined" label="Nội dung" fullWidth onChange={handleChange} />
        <TextField className="input" required name="facebookLink" variant="outlined" label="Link Facebook" fullWidth onChange={handleChange} />
        <TextField className="input" type="number" required name="point" variant="outlined" label="Điểm cống hiến" fullWidth onChange={handleChange} />
        <TextField
          className="input"
          required
          name="expireDate"
          variant="outlined"
          label="Ngày hết hạn đăng ký (dd/mm/yyyy)"
          fullWidth
          onChange={handleChange}
        />
        <div className="btn-container">
          <Button className="btn" variant="contained" color="error" onClick={() => setNewActivity(false)}>
            Hủy
          </Button>
          <Button className="btn" variant="contained" color="primary" type="submit">
            Đăng
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewActivity;
