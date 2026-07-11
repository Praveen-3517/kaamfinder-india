import express from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleAuth);
router.get('/me', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export default router;
