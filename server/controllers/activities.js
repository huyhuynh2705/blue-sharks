import ActivityModel from '../models/activity.js';

const LIMIT = 10;

export const getActivities = async (req, res) => {
  const { page } = req.query;
  try {
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await ActivityModel.countDocuments();
    const activities = await ActivityModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .lean()
      .populate({ path: 'creatorId', select: ['fullName', 'schoolYear', 'department'] });

    res.status(201).json({
      activities,
      currentPage: Number(page),
      numberOfPages: Number(Math.ceil(total / LIMIT)),
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createActivity = async (req, res) => {
  const { creatorId, title, content, facebookLink, point, expireDate } = req.body;
  try {
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    const dateCreated = new Date(new Date() - offset);
    const dateExpired = new Date(new Date(Number(expireDate.slice(6, 10)), Number(expireDate.slice(3, 5)) - 1, Number(expireDate.slice(0, 2))) - offset);
    const newActivity = await ActivityModel.create({
      creatorId: creatorId,
      title: title,
      content: content,
      facebookLink: facebookLink,
      point: point,
      expireDate: dateExpired,
      dateCreated: dateCreated,
    });
    res.status(201).json({ newActivity });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};
