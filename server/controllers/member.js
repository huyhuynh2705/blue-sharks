import mongoose from 'mongoose';
import UserModel from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.SECRET_CODE;
export const updateMember = async (req, res) => {
  const {
    username,
    password,
    address,
    fullName,
    base,
    department,
    dob,
    email,
    facebook,
    faculty,
    gender,
    joinDate,
    phoneNumber,
    schoolYear,
    studentId,
    transport,
    role,
    homeTown,
  } = req.body;
  try {
    if (!req.userId) {
      return res.json({ message: 'Unauthenticated' });
    }
    const oldUser = await UserModel.findById(req.userId);
    if (!oldUser) return res.status(404).json({ message: "User doesn't exists" });

    if (oldUser.username !== username) {
      const oldUsername = await UserModel.findOne({ username });
      if (oldUsername) return res.status(404).json({ message: 'Username already exists' });
    }

    let updateData;
    if (password !== '') {
      const hashedPassword = await bcrypt.hash(password, 12);
      updateData = {
        username,
        fullName: fullName,
        studentId: studentId,
        schoolYear: schoolYear,
        dob: dob,
        joinDate: joinDate,
        faculty: faculty,
        gender: gender,
        address: address,
        phoneNumber: phoneNumber,
        base: base,
        department: department,
        transport: transport,
        facebook: facebook,
        email: email,
        role: role,
        homeTown: homeTown,
        password: hashedPassword,
      };
    } else {
      updateData = {
        username,
        fullName: fullName,
        studentId: studentId,
        schoolYear: schoolYear,
        dob: dob,
        joinDate: joinDate,
        faculty: faculty,
        gender: gender,
        address: address,
        phoneNumber: phoneNumber,
        base: base,
        department: department,
        transport: transport,
        facebook: facebook,
        email: email,
        role: role,
        homeTown: homeTown,
      };
    }

    const result = await UserModel.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    });
    const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: '1h' });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};
