import express from 'express';
import { getEducationHub, getLessonBySlug } from '../controllers/educationController.js';

const router = express.Router();

router.get('/hub', getEducationHub);
router.get('/lessons/:slug', getLessonBySlug);

export default router;