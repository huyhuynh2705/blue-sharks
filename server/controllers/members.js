import UserModel from '../models/user.js';

const LIMIT = 20;

export const getMembers = async (req, res) => {
  const { page } = req.query;
  try {
    // const startIndex = (Number(page) - 1) * LIMIT;
    const total = await UserModel.countDocuments();
    const members = await UserModel.find().sort({ _id: -1 }).lean();

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

export const filterMembers = async (req, res) => {
  const { schoolYear, department, faculty, base, gender } = req.body;
  try {
    const query = createQuery({ schoolYear, department, faculty, base, gender });
    const total = await UserModel.countDocuments();
    const members = await UserModel.find(query).select().sort({ _id: -1 }).lean();
    res.status(201).json({
      members,
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuery = (formObject) => {
  const query = {};
  for (let item in formObject) {
    if (formObject[item] !== '') {
      query[item] = formObject[item];
    }
  }
  return query;
};
