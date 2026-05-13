//backend/src/routes/dashboardRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getDashboardOverview,
  getDashboardActivity,
  updateDashboardProfile,
  getFollowedLeaders,
  followLeader,
  unfollowLeader,
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/overview', protect, getDashboardOverview);
router.get('/activity', protect, getDashboardActivity);
router.put('/profile', protect, updateDashboardProfile);

router.get('/followed-leaders', protect, getFollowedLeaders);
router.post('/followed-leaders/:leaderId', protect, followLeader);
router.delete('/followed-leaders/:leaderId', protect, unfollowLeader);

export default router;