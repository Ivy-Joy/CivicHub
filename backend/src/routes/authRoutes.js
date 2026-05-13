//backend/src/routes/authRoutes.js
import express from 'express';
import {
  register,
  resendVerification,
  verifyOtp,
  createPassword,
  login,
  refreshTokenHandler,
  logout,
  me,
  requestPasswordReset,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter, otpLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/signup', authLimiter, register);
router.post('/resend-verification', otpLimiter, resendVerification);
router.post('/verify-otp', otpLimiter, verifyOtp);
router.post('/verify', otpLimiter, verifyOtp);
router.post('/create-password', createPassword);
router.post('/set-password', createPassword);
router.post('/signin', authLimiter, login);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', logout);
router.get('/me', protect, me);
router.post('/request-password-reset', authLimiter, requestPasswordReset);
router.post('/reset-password', authLimiter, resetPassword);

export default router;