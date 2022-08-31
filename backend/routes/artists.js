import express from 'express';
import { updateGenres, clearTracks } from '../controllers/artists.js';

const router = express.Router();

router.get('/:id/updateGenres', updateGenres);
router.get('/:id/clearTracks', clearTracks);

export default router;