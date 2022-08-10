import express from 'express';
import {register, updateTopArtists, getProfile, getTopArtists} from '../controllers/user.js';

const router = express.Router();

router.get('/', getProfile);
router.post('/', register);
router.patch('/:id/updateTopArtists', updateTopArtists);
router.get('/:id/getTopArtists', getTopArtists);

export default router;