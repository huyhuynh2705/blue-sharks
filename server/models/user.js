import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  studentId: { type: String, required: true },
  schoolYear: { type: Number, required: true },
  faculty: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  base: { type: String, required: true },
  department: { type: String, required: true },
  joinDate: { type: String, required: true },
  points: { type: Number, required: true },
  transport: { type: String, required: true },
  facebook: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  homeTown: { type: String, required: true },
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
