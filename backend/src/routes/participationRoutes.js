import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getParticipationHub,
  createPetition,
  votePoll,
  createConsultation,
  messageLeader,
} from '../controllers/participationController.js';

const router = express.Router();

router.get('/hub', getParticipationHub);
router.post('/petitions', protect, createPetition);
router.post('/polls/:pollId/vote', votePoll);
router.post('/consultations', protect, createConsultation);
router.post('/messages', protect, messageLeader);

export default router;