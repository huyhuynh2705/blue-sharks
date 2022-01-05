import React from 'react';
import { Button, Grid } from '@mui/material';
import './style.css';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Activity = () => {
  return (
    <Grid className="activity" container>
      <Grid item xs={12} sm={9}>
        <div className="content">
          <h4>[ĐĂNG KÝ THAM GIA THỰC HIỆN VIDEO TẾT 2022]</h4>
          <h5>Huỳnh Quang Huy - K18 - Nhân Sự</h5>
          <p>
            Hòa nhịp cùng không khí rộn ràng chào Xuân, hứng khởi đón Tết thì sắp tới BĐH sẽ có chuỗi video về Tết 2022. Các thông tin về video đã được trình
            bày trong form đăng ký, mọi người đọc kỹ nhé.
          </p>
          <a href="#">Link bài đăng trên Facebook</a>
        </div>
      </Grid>
      <Grid item xs={12} sm={3}>
        <div className="action-container">
          <div className="action">
            <div className="flex">
              <EventBusyIcon />
              <p>
                <span>Deadline: </span>10/01/2022
              </p>
            </div>
            <div className="flex">
              <PeopleAltIcon />
              <p>
                <span>Người tham gia: </span>50
              </p>
            </div>
          </div>
          <Button className="btn" variant="contained" fullWidth>
            Tham gia
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Activity;
