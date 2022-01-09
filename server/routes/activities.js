import express from 'express';
import auth from '../middleware/auth.js';

import { createActivity, getActivities, joinActivity, deleteActivity, updateActivity, getMoreActivities } from '../controllers/activities.js';

const router = express.Router();

router.post('/', auth, createActivity);
router.get('/', auth, getActivities);
router.get('/more', auth, getMoreActivities);
router.put('/:activityId/join', auth, joinActivity);
router.delete('/:activityId/delete', auth, deleteActivity);
router.put('/:activityId', auth, updateActivity);

export default router;
