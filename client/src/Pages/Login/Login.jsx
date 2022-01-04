import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../Assets/LGBS.png';
import { useDispatch } from 'react-redux';
import './style.css';

import { logIn } from '../../actions/auth';

export default function Login() {
  const [form, setform] = React.useState({
    username: '',
    password: '',
    remember: false,
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(form));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemember = (e) => {
    form.remember ? setform({ ...form, remember: false }) : setform({ ...form, remember: true });
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
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="username" label="Tên đăng nhập" name="username" onChange={handleChange} autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Mật khẩu" type="password" id="password" onChange={handleChange} />
          <div className="login">
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Ghi nhớ đăng nhập" name="remember" onChange={handleRemember} />
            <a href="/signup">Đăng ký</a>
          </div>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
