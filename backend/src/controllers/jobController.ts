import { Response } from 'express';
import Job from '../models/Job';
import Application from '../models/Application';
import { AuthRequest } from '../middleware/auth';
import { getNearbyJobs } from '../utils/geolocation';
import { getMockData, addJob } from '../config/mockDb';
import { fetchAggregatedJobs } from '../utils/jobAggregation';

export const getAllJobs = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { category, jobType, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter: any = { status: 'active' };
    if (category) filter.category = category;
    if (jobType) filter.jobType = jobType;

    try {
      const jobs = await fetchAggregatedJobs({
        category: String(category || ''),
        jobType: String(jobType || ''),
      });
      const paginatedJobs = jobs.slice(skip, skip + Number(limit));
      const total = jobs.length;

      return res.json({
        jobs: paginatedJobs,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (dbError) {
      // MongoDB not available, use mock data
      const mockData = getMockData();
      let jobs = mockData.jobs;

      if (category) {
        jobs = jobs.filter((j: any) => j.category === category);
      }
      if (jobType) {
        jobs = jobs.filter((j: any) => j.jobType === jobType);
      }

      const total = jobs.length;
      const paginatedJobs = jobs.slice(skip, skip + Number(limit));

      return res.json({
        jobs: paginatedJobs,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
        mode: 'mock',
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNearbyJobs_Controller = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { lat, lng, distance = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    try {
      const allJobs = await Job.find({ status: 'active' }).populate('company', 'name logo');
      const nearby = getNearbyJobs(Number(lat), Number(lng), allJobs, Number(distance));

      return res.json({ jobs: nearby });
    } catch (dbError) {
      // Mock data
      const mockData = getMockData();
      return res.json({ jobs: mockData.jobs, mode: 'mock' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { search, location, category, minSalary, maxSalary } = req.query;
    const searchText = typeof search === 'string' ? search.trim() : '';
    const locationText = typeof location === 'string' ? location.trim() : '';
    const categoryText = typeof category === 'string' ? category.trim() : '';
    const minSalaryValue = Number(minSalary || 0);
    const maxSalaryValue = Number(maxSalary || 0);

    const filter: any = { status: 'active' };

    if (searchText) {
      filter.$or = [
        { title: { $regex: searchText, $options: 'i' } },
        { description: { $regex: searchText, $options: 'i' } },
        { category: { $regex: searchText, $options: 'i' } },
      ];
    }

    if (categoryText) filter.category = categoryText;
    if (locationText) filter['location.city'] = { $regex: locationText, $options: 'i' };
    if (minSalaryValue > 0 || maxSalaryValue > 0) {
      filter['salary.min'] = { $gte: minSalaryValue || 0 };
      if (maxSalaryValue > 0) filter['salary.max'] = { $lte: maxSalaryValue };
    }

    const jobs = await fetchAggregatedJobs({
      search: searchText,
      location: locationText,
      category: categoryText,
    });

    return res.json({ jobs });
  } catch (error: any) {
    console.error('Search error:', error);
    return res.status(500).json({ message: error.message || 'Search failed' });
  }
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company')
      .populate('postedBy', 'name email phone');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ job });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    try {
      // Try MongoDB
      const job = new Job({
        ...req.body,
        postedBy: req.user?.id,
      });

      await job.save();
      await job.populate('company');

      return res.status(201).json({
        message: 'Job created successfully',
        job,
      });
    } catch (dbError: any) {
      // Fallback to mock data
      const mockData = getMockData();
      const newJob = {
        _id: String(mockData.jobs.length + 1),
        title: req.body.title || 'Untitled Job',
        description: req.body.description || '',
        category: req.body.category || 'Labour',
        location: req.body.location || { address: 'Unknown', lat: 0, lng: 0, city: 'Unknown' },
        salary: req.body.salary || { min: 0, max: 0, currency: 'INR', period: 'daily' },
        jobType: req.body.jobType || 'Daily Wage',
        experience: req.body.experience || 'Fresher',
        skills: req.body.skills || [],
        postedBy: req.user?.id || 'anonymous',
        status: 'active',
        totalApplicants: 0,
        applicants: [],
      };
      addJob(newJob);
      return res.status(201).json({
        message: 'Job created successfully (mock mode)',
        job: newJob,
        mode: 'mock',
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      message: 'Job updated successfully',
      job,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const applyJob = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({
      jobId,
      userId: req.user?.id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = new Application({
      jobId,
      userId: req.user?.id,
      employerId: job.postedBy,
    });

    await application.save();
    job.applicants.push(req.user?.id as any);
    job.totalApplicants += 1;
    await job.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
