import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../Assets/LGBS.png';
import { useDispatch } from 'react-redux';

import './style.css';

import { signUp } from '../../actions/auth';

const validateForm = (form) => {
  if (form.username.includes(' ') || form.password.includes(' ')) {
    alert('Tên đăng nhập và mật khẩu không chứa khoảng trắng.');
    return false;
  }
  if (form.username.length < 3 || form.password.length < 3 || form.username.length > 20 || form.password.length > 20) {
    alert('Tên đăng nhập và mật khẩu phải từ 3-20 ký tự.');
    return false;
  }
  if (isNaN(form.studentId) || !(Number(form.studentId.slice(0, 2)) > 0 && Number(form.studentId.slice(0, 2)) < 99) || form.studentId.length !== 7) {
    alert('Sai định dạng mã số sinh viên.');
    return false;
  }
  return true;
};

export default function SignUp() {
  const [form, setform] = React.useState({
    username: '',
    password: '',
    fullName: '',
    studentId: '',
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      dispatch(signUp(form));
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img className="logo-bs" src={Logo} alt="Logo" />
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="username" label="Tên đăng nhập" name="username" onChange={handleChange} autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Mật khẩu" type="password" id="password" onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="fullName" label="Họ và tên" type="text" id="fullName" onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="studentId" label="Mã số sinh viên" type="text" id="studentId" onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Đăng ký
          </Button>
          <a href="/login">Đã có tài khoản? Đăng nhập.</a>
        </Box>
      </Box>
    </Container>
  );
}
