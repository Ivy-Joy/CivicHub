import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAccountabilityHub,
  submitReport,
} from '../controllers/accountabilityController.js';

const router = express.Router();

router.get('/hub', getAccountabilityHub);
router.post('/reports', protect, submitReport);

export default router;