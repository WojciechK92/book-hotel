import express from 'express';
import PageController from '../controllers/page-controller.js';
import TripController from '../controllers/trip-controller.js';
import AuthController from '../controllers/auth-controller.js';

const router = new express.Router();

router.get('/', PageController.showHomePage);
router.get('/all-inclusive', TripController.showAllInclusive);
router.get('/login', AuthController.showLoginForm);
router.post('/login', AuthController.login);
router.get('/register', AuthController.showRegisterForm);
router.post('/register', AuthController.register);
router.get('*', PageController.showNotFound);

export default router;