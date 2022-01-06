import express from 'express';

import { createActivity, getActivities } from '../controllers/activities.js';

const router = express.Router();

router.post('/', createActivity);
router.get('/', getActivities);

export default router;
