import express from 'express';
import authRoutes from './authRoutes.js';
import accountabilityRoutes from './accountabilityRoutes.js';
import profileRoutes from './profileRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import supportRoutes from './supportRoutes.js';
import civicRoutes from './civicRoutes.js';
import educationRoutes from './educationRoutes.js';
import participationRoutes from './participationRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/civic', civicRoutes);
router.use('/support', supportRoutes);
router.use('/accountability', accountabilityRoutes);
router.use('/education', educationRoutes);
router.use('/participate', participationRoutes);


export default router;