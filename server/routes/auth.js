import express from 'express';

import { logIn, signUp } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp);

export default router;
