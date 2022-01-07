import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_CODE;

export const logIn = async (req, res) => {
  const { username, password, remember } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });

    if (!oldUser) return res.status(400).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: remember ? '30d' : '2h' });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signUp = async (req, res) => {
  const { username, password, fullName, studentId } = req.body;
  try {
    const oldMember = await UserModel.findOne({ studentId });
    if (oldMember) return res.status(400).json({ message: 'Student already exists' });
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      username: username,
      password: hashedPassword,
      fullName: fullName,
      studentId: studentId,
      dob: '01/12/2022',
      joinDate: '01/12/2022',
      schoolYear: 0,
      faculty: 'none',
      gender: 'none',
      address: 'none',
      phoneNumber: 'none',
      base: 'none',
      department: 'none',
      point: 0,
      transport: 'none',
      facebook: 'none',
      email: 'none',
      role: 'none',
      homeTown: 'none',
    });

    const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: '1h' });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};
