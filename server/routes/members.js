import express from 'express';
import auth from '../middleware/auth.js';

import { getMembers, filterMembers } from '../controllers/members.js';

const router = express.Router();

router.get('/', getMembers);
router.post('/filter', auth, filterMembers);

export default router;
