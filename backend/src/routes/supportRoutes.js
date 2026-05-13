import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getSupportHub, createDonation, confirmDonation } from '../controllers/supportController.js';

const router = express.Router();

router.get('/support', getSupportHub);
router.post('/donations', createDonation);
router.post('/donations/:donationId/confirm', protect, confirmDonation);

export default router;