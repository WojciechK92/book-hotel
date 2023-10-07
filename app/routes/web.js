import express from 'express';
import PageController from '../controllers/page-controller.js';
import TripController from '../controllers/trip-controller.js';
import UserController from '../controllers/user-controller.js';

const router = new express.Router();

router.get('/', PageController.showHomePage);
router.get('/all-inclusive', TripController.showAllInclusive);
router.get('/login', UserController.showLoginForm);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/register', UserController.showRegisterForm);
router.post('/register', UserController.register);
router.get('*', PageController.showNotFound);

export default router;