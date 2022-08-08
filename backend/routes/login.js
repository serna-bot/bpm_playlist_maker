import express from 'express';

import { login, callback, refreshToken } from '../controllers/login.js';

const router = express.Router();

router.get('/', login);
router.get('/callback', callback);
router.get('/refreshToken', refreshToken);

export default router;