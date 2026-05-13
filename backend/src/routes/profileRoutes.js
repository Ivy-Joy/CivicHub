import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getMyProfile,
  updateMyProfile,
  getSavedStations,
  saveStation,
  removeStation,
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);
router.get('/saved-stations', protect, getSavedStations);
router.post('/saved-stations/:stationId', protect, saveStation);
router.delete('/saved-stations/:stationId', protect, removeStation);

export default router;