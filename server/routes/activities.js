import express from 'express';
import auth from '../middleware/auth.js';

import { createActivity, getActivities, joinActivity, deleteActivity, updateActivity } from '../controllers/activities.js';

const router = express.Router();

router.post('/', auth, createActivity);
router.get('/', auth, getActivities);
router.put('/:activityId/join', auth, joinActivity);
router.delete('/:activityId/delete', auth, deleteActivity);
router.put('/:activityId', auth, updateActivity);

export default router;
