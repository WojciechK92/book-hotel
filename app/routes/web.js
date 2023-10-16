import express from 'express';
import PageController from '../controllers/page-controller.js';
import TripController from '../controllers/trip-controller.js';
import UserController from '../controllers/user-controller.js';
import AdminController from '../controllers/admin-controller.js';
import upload from '../services/uploader.js';
import errorHandlerMiddleware from '../middleware/error-handler-middleware.js';

const router = new express.Router();

router.get('/', PageController.showHomePage);
router.get('/trips', TripController.showPageWithTrips);
router.get('/all-inclusive', TripController.showPageWithTrips);
router.get('/last-minute', TripController.showPageWithTrips);
router.get('/login', UserController.showLoginForm);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/register', UserController.showRegisterForm);
router.post('/register', UserController.register);

router.get('/profile/edit', UserController.showEditProfileForm);
router.post('/profile/edit', UserController.editProfile);

router.get('/admin', AdminController.showAdminPanel);
router.get('/admin/add-trip', AdminController.showAddTripForm);
router.post('/admin/add-trip', upload.single('image'), errorHandlerMiddleware, AdminController.addTrip);
router.get('/admin/edit-trip/:id', AdminController.showEditTripForm);
router.post('/admin/edit-trip/:id', upload.single('image'), errorHandlerMiddleware, AdminController.editTrip);
router.get('/admin/delete-trip/:id', AdminController.deleteTrip);

router.get('/admin/logout', AdminController.logout);
router.get('/login/admin', AdminController.showLoginForm);
router.post('/login/admin', AdminController.login);

router.get('*', PageController.showNotFound);

export default router;