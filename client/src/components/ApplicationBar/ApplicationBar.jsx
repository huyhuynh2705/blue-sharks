import React, { useState, useEffect } from 'react';
import Logo from '../../Assets/LGBS.png';
import './style.css';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

export default function ApplicationBar() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOG_OUT' });
    window.location.reload();
  };

  const signOut = () => {
    dispatch({ type: 'LOG_OUT' });
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        signOut();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed">
      <div className="container">
        <a href="/" className="container">
          <img className="logo" src={Logo} alt="Logo" />
          <p>HCMUT Blue Sharks</p>
        </a>
        <p className="button" onClick={handleClick}>
          Đăng xuất
        </p>
      </div>
    </div>
  );
}
