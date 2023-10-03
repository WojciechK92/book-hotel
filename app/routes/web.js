import express from 'express';
import PageController from '../controllers/page-controller.js';

const router = new express.Router();

router.get('/', PageController.showHomePage);
router.get('*', PageController.showNotFound);

export default router;