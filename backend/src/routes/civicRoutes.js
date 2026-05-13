//civicRoutes.js
import express from 'express';
import {
  searchStations,
  getStationById,
  getAreaByStationId,
  getAreaHub,
  getLeaderDetail,
  compareLeaders,
} from '../controllers/civicController.js';

const router = express.Router();

router.get('/stations/search', searchStations);
router.get('/stations/:id', getStationById);
router.get('/areas/by-station/:stationId', getAreaByStationId);
router.get('/areas/:areaId/hub', getAreaHub);
router.get('/leaders/:leaderId', getLeaderDetail);
router.get('/leaders/compare', compareLeaders);

export default router;