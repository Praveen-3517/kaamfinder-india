import axios from 'axios';
import Job from '../models/Job';

const normalizeRemoteJob = (item: any) => ({
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

export const fetchAggregatedJobs = async (filters: any = {}) => {
  const localJobs = await Job.find({ status: 'active' }).lean();

  const remoteJobs: any[] = [];
  try {
    const response = await axios.get('https://www.zippia.com/api/jobs/', {
      params: {
        companySkills: true,
        pagesize: 8,
        page: 1,
      },
      timeout: 10000,
    });

    if (Array.isArray(response.data?.jobs)) {
      response.data.jobs.slice(0, 8).forEach((item: any) => remoteJobs.push(normalizeRemoteJob(item)));
    }
  } catch (error) {
    // ignore external failures and fall back to local jobs only
  }

  const combined = [...localJobs, ...remoteJobs];

  return combined.filter((job: any) => {
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
