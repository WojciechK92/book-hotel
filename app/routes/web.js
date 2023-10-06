import express from 'express';
import PageController from '../controllers/page-controller.js';
import TripController from '../controllers/trip-controller.js';

const router = new express.Router();

router.get('/', PageController.showHomePage);
router.get('/all-inclusive', TripController.showAllInclusive);
router.get('*', PageController.showNotFound);

export default router;