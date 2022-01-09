import ActivityModel from '../models/activity.js';
import UserModel from '../models/user.js';
import mongoose from 'mongoose';

const LIMIT = 5;

export const getActivities = async (req, res) => {
  try {
    const total = await ActivityModel.countDocuments();
    const activities = await ActivityModel.find({})
      .sort({ _id: -1 })
      .limit(LIMIT)
      .lean()
      .populate({ path: 'creatorId', select: ['fullName', 'schoolYear', 'department'] });

    const hasMore = total - LIMIT > 0 ? true : false;
    res.status(201).json({
      activities: activities,
      hasMore: hasMore,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMoreActivities = async (req, res) => {
  const { skip } = req.query;
  try {
    const total = await ActivityModel.countDocuments();
    const activities = await ActivityModel.find({})
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(Number(skip))
      .lean()
      .populate({ path: 'creatorId', select: ['fullName', 'schoolYear', 'department'] });

    const hasMore = total - (skip + activities.length) > 0 ? true : false;
    res.status(201).json({
      activities: activities,
      hasMore: hasMore,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createActivity = async (req, res) => {
  const { title, content, facebookLink, point, expireDate } = req.body;
  try {
    if (!req.userId) {
      return res.json({ message: 'Unauthenticated' });
    }
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    const dateCreated = new Date(new Date() - offset);
    const dateExpired = new Date(new Date(Number(expireDate.slice(6, 10)), Number(expireDate.slice(3, 5)) - 1, Number(expireDate.slice(0, 2))) - offset);
    const newActivity = await ActivityModel.create({
      creatorId: req.userId,
      title: title,
      content: content,
      facebookLink: facebookLink,
      point: point,
      expireDate: dateExpired,
      dateCreated: dateCreated,
    });
    const result = await ActivityModel.find({ _id: newActivity._id }).populate({ path: 'creatorId', select: ['fullName', 'schoolYear', 'department'] });
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

export const joinActivity = async (req, res) => {
  const { activityId } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: 'Unauthenticated' });
    }
    const oldUser = await UserModel.findById(req.userId);
    if (!oldUser) return res.status(404).json({ message: "User doesn't exists" });

    if (!mongoose.Types.ObjectId.isValid(activityId)) return res.status(404).send(`No activity with id: ${activityId}`);

    const activity = await ActivityModel.findById(activityId);

    const index = activity.participants.findIndex((id) => String(id) === req.userId);
    if (index === -1) {
      activity.participants.push(req.userId);
      oldUser.point += activity.point;
    } else {
      oldUser.point -= activity.point;
      activity.participants = activity.participants.filter((id) => String(id) !== req.userId);
    }

    await UserModel.findByIdAndUpdate(req.userId, oldUser, {
      new: true,
    });
    const updatedActivity = await ActivityModel.findByIdAndUpdate(activityId, activity, { new: true });
    res.status(200).json({ updatedParticipants: updatedActivity.participants, _id: updatedActivity._id, point: oldUser.point });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  const { activityId } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: 'Unauthenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(activityId)) return res.status(404).send(`No activity with id: ${activityId}`);

    const activity = await ActivityModel.findById(activityId);

    if (String(activity.creatorId) === String(req.userId)) {
      await ActivityModel.findByIdAndRemove(activityId);
      res.status(200).json(activityId);
    } else {
      return res.json({ message: 'Unauthenticated' });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateActivity = async (req, res) => {
  const { activityId } = req.params;
  const { title, content, facebookLink, point, expireDate } = req.body;

  try {
    if (!req.userId) {
      return res.json({ message: 'Unauthenticated' });
    }
    if (!mongoose.Types.ObjectId.isValid(activityId)) return res.status(404).send(`No activity with id: ${activityId}`);
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    const dateExpired = new Date(new Date(Number(expireDate.slice(6, 10)), Number(expireDate.slice(3, 5)) - 1, Number(expireDate.slice(0, 2))) - offset);

    const oldActivity = await ActivityModel.findOneAndUpdate(
      activityId,
      { title, content, facebookLink, point, expireDate: dateExpired },
      { new: true }
    ).populate({ path: 'creatorId', select: ['fullName', 'schoolYear', 'department'] });
    res.status(200).json(oldActivity);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
