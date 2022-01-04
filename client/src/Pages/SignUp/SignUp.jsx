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
    dispatch(signUp(form));
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
        <img className="logo" src={Logo} alt="Logo" />
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
