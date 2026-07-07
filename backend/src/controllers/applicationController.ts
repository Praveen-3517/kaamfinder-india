import { Response } from 'express';
import Application from '../models/Application';
import { AuthRequest } from '../middleware/auth';

export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await Application.find({ userId: req.user?.id })
      .populate('jobId')
      .populate('employerId', 'name email')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobApplications = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: 'Application status updated',
      application,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = {
      totalApplications: await Application.countDocuments({ userId: req.user?.id }),
      applied: await Application.countDocuments({ userId: req.user?.id, status: 'applied' }),
      shortlisted: await Application.countDocuments({ userId: req.user?.id, status: 'shortlisted' }),
      rejected: await Application.countDocuments({ userId: req.user?.id, status: 'rejected' }),
      accepted: await Application.countDocuments({ userId: req.user?.id, status: 'accepted' }),
    };

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
