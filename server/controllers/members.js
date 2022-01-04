import UserModel from '../models/user.js';

const LIMIT = 20;

export const getMembers = async (req, res) => {
  const { page } = req.query;
  try {
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await UserModel.countDocuments();
    const members = await UserModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .lean();

    res.status(201).json({
      members,
      currentPage: Number(page),
      numberOfPages: Number(Math.ceil(total / LIMIT)),
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
