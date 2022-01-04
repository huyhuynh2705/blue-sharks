import * as React from 'react';
import Logo from '../../Assets/LGBS.png';
import './style.css';
import { deleteUserInformationFromStorage } from '../../helper/index';

export default function ApplicationBar() {
  const handleClick = (e) => {
    e.preventDefault();
    deleteUserInformationFromStorage();
    window.location.reload();
  };
  return (
    <div className="container">
      <a href="/" className="container">
        <img className="logo" src={Logo} alt="Logo" />
        <p>HCMUT Blue Sharks</p>
      </a>
      <p className="button" onClick={handleClick}>
        Đăng xuất
      </p>
    </div>
  );
}
