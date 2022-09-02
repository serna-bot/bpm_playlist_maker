import express from 'express';
import { createPlaylist, updateGenres, clearTracks } from '../controllers/artists.js';

const router = express.Router();

router.get('/:id/updateGenres', updateGenres);
router.get('/:id/clearTracks', clearTracks);
router.post('/:id/createPlaylist', createPlaylist);

export default router;