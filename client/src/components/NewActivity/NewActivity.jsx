import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import './style.css';
import { createActivity } from '../../actions/activities';
import { useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = { title: '', content: '', facebookLink: '', point: '', expireDate: '' };

const validateForm = (form) => {
  if (form.title.length < 3 || form.title.length > 100) {
    alert('Tiêu đề phải từ 3-100 ký tự.');
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
  const handleChangeContent = (e, editor) => {
    const data = editor.getData();
    setForm({ ...form, content: data });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      dispatch(createActivity(form, setNewActivity));
    }
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8}>
        <div className="newactivity">
          <p>Hoạt động mới</p>
          <form onSubmit={handleSubmit}>
            <TextField className="input" required name="title" variant="outlined" label="Tiêu đề" fullWidth onChange={handleChange} />
            <CKEditor editor={ClassicEditor} data="<p>Nội dung</p>" onChange={handleChangeContent} />
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
      </Grid>
    </Grid>
  );
};

export default NewActivity;
