import express from 'express';
import auth from '../middleware/auth.js';

import { updateMember } from '../controllers/member.js';

const router = express.Router();

router.post('/update', auth, updateMember);

export default router;
