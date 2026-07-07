"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAggregatedJobs = void 0;
const axios_1 = __importDefault(require("axios"));
const Job_1 = __importDefault(require("../models/Job"));
const normalizeRemoteJob = (item) => ({
    _id: item.id || item._id || `remote-${Math.random().toString(36).slice(2)}`,
    title: item.title || item.job_title || 'Remote Job',
    description: item.description || item.snippet || 'Remote opportunity',
    category: item.category || item.type || 'Other',
    location: {
        address: item.location || item.city || 'Remote',
        city: item.city || 'Remote',
        state: item.state || 'Remote',
        lat: 20.5937,
        lng: 78.9629,
    },
    salary: {
        min: item.salary_min || item.min_salary || 300,
        max: item.salary_max || item.max_salary || 800,
        currency: 'INR',
        period: 'daily',
    },
    jobType: item.jobType || item.type || 'Full-time',
    experience: item.experience || 'Fresher',
    skills: item.skills || ['Communication'],
    status: 'active',
    postedBy: 'external',
    totalApplicants: 0,
    applicants: [],
    source: 'remote',
    createdAt: new Date(),
    updatedAt: new Date(),
});
const fetchAggregatedJobs = async (filters = {}) => {
    const localJobs = await Job_1.default.find({ status: 'active' }).lean();
    const remoteJobs = [];
    try {
        const response = await axios_1.default.get('https://www.zippia.com/api/jobs/', {
            params: {
                companySkills: true,
                pagesize: 8,
                page: 1,
            },
            timeout: 10000,
        });
        if (Array.isArray(response.data?.jobs)) {
            response.data.jobs.slice(0, 8).forEach((item) => remoteJobs.push(normalizeRemoteJob(item)));
        }
    }
    catch (error) {
        // ignore external failures and fall back to local jobs only
    }
    const combined = [...localJobs, ...remoteJobs];
    return combined.filter((job) => {
        const search = (filters.search || '').toString().toLowerCase();
        const location = (filters.location || '').toString().toLowerCase();
        const category = (filters.category || '').toString().toLowerCase();
        if (search && !`${job.title} ${job.description} ${job.category}`.toLowerCase().includes(search)) {
            return false;
        }
        if (location && !`${job.location?.city || ''} ${job.location?.state || ''}`.toLowerCase().includes(location)) {
            return false;
        }
        if (category && !`${job.category}`.toLowerCase().includes(category)) {
            return false;
        }
        return true;
    });
};
exports.fetchAggregatedJobs = fetchAggregatedJobs;
//# sourceMappingURL=jobAggregation.js.map