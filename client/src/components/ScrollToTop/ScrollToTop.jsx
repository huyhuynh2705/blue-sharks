import React, { useState } from 'react';
import './style.css';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Button } from '@mui/material';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className="scrool-to-top">
      <Button className="btn" variant="contained" size="small" onClick={scrollToTop} style={{ display: visible ? 'flex' : 'none' }}>
        <ArrowCircleUpIcon fontSize="large" />
      </Button>
    </div>
  );
};

export default ScrollButton;
