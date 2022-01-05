import React from 'react';
import './style.css';

function createData(
  id,
  fullName,
  schoolYear,
  department,
  phoneNumber,
  faculty,
  studentId,
  base,
  dob,
  transport,
  gender,
  joinDate,
  points,
  role,
  email,
  facebook,
  homeTown,
  address
) {
  return {
    id,
    fullName,
    schoolYear,
    department,
    phoneNumber,
    faculty,
    studentId,
    base,
    dob,
    transport,
    gender,
    joinDate,
    points,
    role,
    email,
    facebook,
    homeTown,
    address,
  };
}

const Table = ({ data, setIdDetail }) => {
  const rows = [];
  for (const item of data) {
    rows.push(
      createData(
        item._id,
        item.fullName,
        item.schoolYear,
        item.department,
        item.phoneNumber,
        item.faculty,
        item.studentId,
        item.base,
        item.dob,
        item.transport,
        item.gender,
        item.joinDate,
        item.points,
        item.role,
        item.email,
        item.facebook,
        item.homeTown,
        item.address
      )
    );
  }

  return (
    <div className="table">
      {rows.length ? (
        <table>
          <tbody>
            <tr>
              <th>Xem</th>
              <th>Họ và tên</th>
              <th>Khóa</th>
              <th>Ban</th>
              <th>Điện thoại</th>
              <th>Khoa</th>
              <th>MSSV</th>
              <th>Cơ sở</th>
              <th>Ngày sinh</th>
              <th>Phương tiện</th>
              <th>Giới tính</th>
              <th>Ngày tham gia</th>
              <th>Cống hiến</th>
              <th>Vai trò</th>
              <th>Email</th>
              <th>Facebook</th>
              <th>Quê quán</th>
              <th>Địa chỉ ở TPHCM</th>
            </tr>
            {rows.map((row) => (
              <tr key={row.id}>
                <td onClick={() => setIdDetail(row.id)}>
                  <span>Chi tiết</span>
                </td>
                <td>{row.fullName}</td>
                <td>{row.schoolYear}</td>
                <td>{row.department}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.faculty}</td>
                <td>{row.studentId}</td>
                <td>{row.base}</td>
                <td>{row.dob}</td>
                <td>{row.transport}</td>
                <td>{row.gender}</td>
                <td>{row.joinDate}</td>
                <td>{row.points}</td>
                <td>{row.role}</td>
                <td>{row.email}</td>
                <td>{row.facebook}</td>
                <td>{row.homeTown}</td>
                <td>{row.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
};

export default Table;
