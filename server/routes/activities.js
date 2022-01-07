import express from 'express';
import auth from '../middleware/auth.js';

import { createActivity, getActivities, joinActivity } from '../controllers/activities.js';

const router = express.Router();

router.post('/', auth, createActivity);
router.get('/', auth, getActivities);
router.put('/:activityId/join', auth, joinActivity);

export default router;
