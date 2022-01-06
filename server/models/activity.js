import mongoose from 'mongoose';
import UserModel from './user.js';

const activitySchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
  facebookLink: { type: String, required: true },
  point: { type: Number, required: true },
  expireDate: { type: Date, required: true },
  participants: { type: [mongoose.Schema.Types.ObjectId], default: [] },
});

const ActivityModel = mongoose.model('ActivityModel', activitySchema);

export default ActivityModel;
