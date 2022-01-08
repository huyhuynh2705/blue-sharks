import express from 'express';
import auth from '../middleware/auth.js';

import { getMembers, filterMembers, getParticipants } from '../controllers/members.js';

const router = express.Router();

router.get('/', getMembers);
router.post('/filter', auth, filterMembers);
router.post('/participants', getParticipants);

export default router;
