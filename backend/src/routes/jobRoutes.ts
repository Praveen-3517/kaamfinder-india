import express from 'express';
import * as jobController from '../controllers/jobController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/nearby', authMiddleware, jobController.getNearbyJobs_Controller);
router.get('/search', jobController.searchJobs);
router.get('/:id', jobController.getJobById);
router.post('/', authMiddleware, jobController.createJob);
router.put('/:id', authMiddleware, jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);
router.post('/:id/apply', authMiddleware, jobController.applyJob);

export default router;
