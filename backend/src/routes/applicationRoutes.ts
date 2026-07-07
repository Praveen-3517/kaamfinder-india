import express from 'express';
import * as applicationController from '../controllers/applicationController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/my', authMiddleware, applicationController.getMyApplications);
router.get('/job/:jobId', authMiddleware, applicationController.getJobApplications);
router.patch('/:id', authMiddleware, applicationController.updateApplicationStatus);
router.get('/stats', authMiddleware, applicationController.getApplicationStats);

export default router;
