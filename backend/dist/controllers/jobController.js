"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyJob = exports.deleteJob = exports.updateJob = exports.createJob = exports.getJobById = exports.searchJobs = exports.getNearbyJobs_Controller = exports.getAllJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const Application_1 = __importDefault(require("../models/Application"));
const geolocation_1 = require("../utils/geolocation");
const mockDb_1 = require("../config/mockDb");
const jobAggregation_1 = require("../utils/jobAggregation");
const getAllJobs = async (req, res) => {
    try {
        const { category, jobType, page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const filter = { status: 'active' };
        if (category)
            filter.category = category;
        if (jobType)
            filter.jobType = jobType;
        try {
            const jobs = await (0, jobAggregation_1.fetchAggregatedJobs)({
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
        }
        catch (dbError) {
            // MongoDB not available, use mock data
            const mockData = (0, mockDb_1.getMockData)();
            let jobs = mockData.jobs;
            if (category) {
                jobs = jobs.filter((j) => j.category === category);
            }
            if (jobType) {
                jobs = jobs.filter((j) => j.jobType === jobType);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllJobs = getAllJobs;
const getNearbyJobs_Controller = async (req, res) => {
    try {
        const { lat, lng, distance = 10 } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }
        try {
            const allJobs = await Job_1.default.find({ status: 'active' }).populate('company', 'name logo');
            const nearby = (0, geolocation_1.getNearbyJobs)(Number(lat), Number(lng), allJobs, Number(distance));
            return res.json({ jobs: nearby });
        }
        catch (dbError) {
            // Mock data
            const mockData = (0, mockDb_1.getMockData)();
            return res.json({ jobs: mockData.jobs, mode: 'mock' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getNearbyJobs_Controller = getNearbyJobs_Controller;
const searchJobs = async (req, res) => {
    try {
        const { search, location, category, minSalary, maxSalary } = req.query;
        const searchText = typeof search === 'string' ? search.trim() : '';
        const locationText = typeof location === 'string' ? location.trim() : '';
        const categoryText = typeof category === 'string' ? category.trim() : '';
        const minSalaryValue = Number(minSalary || 0);
        const maxSalaryValue = Number(maxSalary || 0);
        const filter = { status: 'active' };
        if (searchText) {
            filter.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { description: { $regex: searchText, $options: 'i' } },
                { category: { $regex: searchText, $options: 'i' } },
            ];
        }
        if (categoryText)
            filter.category = categoryText;
        if (locationText)
            filter['location.city'] = { $regex: locationText, $options: 'i' };
        if (minSalaryValue > 0 || maxSalaryValue > 0) {
            filter['salary.min'] = { $gte: minSalaryValue || 0 };
            if (maxSalaryValue > 0)
                filter['salary.max'] = { $lte: maxSalaryValue };
        }
        const jobs = await (0, jobAggregation_1.fetchAggregatedJobs)({
            search: searchText,
            location: locationText,
            category: categoryText,
        });
        return res.json({ jobs });
    }
    catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({ message: error.message || 'Search failed' });
    }
};
exports.searchJobs = searchJobs;
const getJobById = async (req, res) => {
    try {
        const job = await Job_1.default.findById(req.params.id)
            .populate('company')
            .populate('postedBy', 'name email phone');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ job });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getJobById = getJobById;
const createJob = async (req, res) => {
    try {
        try {
            // Try MongoDB
            const job = new Job_1.default({
                ...req.body,
                postedBy: req.user?.id,
            });
            await job.save();
            await job.populate('company');
            return res.status(201).json({
                message: 'Job created successfully',
                job,
            });
        }
        catch (dbError) {
            // Fallback to mock data
            const mockData = (0, mockDb_1.getMockData)();
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
            (0, mockDb_1.addJob)(newJob);
            return res.status(201).json({
                message: 'Job created successfully (mock mode)',
                job: newJob,
                mode: 'mock',
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
    try {
        const job = await Job_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({
            message: 'Job updated successfully',
            job,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    try {
        await Job_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteJob = deleteJob;
const applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const job = await Job_1.default.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        const existingApplication = await Application_1.default.findOne({
            jobId,
            userId: req.user?.id,
        });
        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied to this job' });
        }
        const application = new Application_1.default({
            jobId,
            userId: req.user?.id,
            employerId: job.postedBy,
        });
        await application.save();
        job.applicants.push(req.user?.id);
        job.totalApplicants += 1;
        await job.save();
        res.status(201).json({
            message: 'Application submitted successfully',
            application,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.applyJob = applyJob;
//# sourceMappingURL=jobController.js.map