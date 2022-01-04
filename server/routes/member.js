import express from 'express';

import { updateMember } from '../controllers/member.js';

const router = express.Router();

router.post('/update', updateMember);

export default router;
