'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { MapPin, DollarSign, Briefcase, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const categories = [
  'Labour',
  'Driver',
  'Delivery',
  'Construction',
  'Factory',
  'Office',
  'Cleaning',
  'Electrician',
  'Plumbing',
  'Security',
  'Gardening',
  'Carpentry',
];

const jobTypes = ['Daily Wage', 'Part-time', 'Full-time', 'Contract', 'Temporary'];
const experienceOptions = ['Fresher', '1-2 years', '2-3 years', '3-5 years', '5+ years'];

interface FormData {
  title: string;
  description: string;
  category: string;
  location: string;
  city: string;
  minSalary: number;
  maxSalary: number;
  jobType: string;
  experience: string;
  skills: string;
}

export default function PostJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    location: '',
    city: '',
    minSalary: 0,
    maxSalary: 0,
    jobType: '',
    experience: '',
    skills: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'minSalary' || name === 'maxSalary' ? Number(value) : value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Job title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Job description is required');
      return false;
    }
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.city.trim()) {
      setError('City is required');
      return false;
    }
    if (formData.minSalary <= 0) {
      setError('Minimum salary must be greater than 0');
      return false;
    }
    if (formData.maxSalary < formData.minSalary) {
      setError('Maximum salary must be greater than or equal to minimum salary');
      return false;
    }
    if (!formData.jobType) {
      setError('Please select job type');
      return false;
    }
    if (!formData.experience) {
      setError('Please select experience level');
      return false;
    }
    if (!formData.skills.trim()) {
      setError('Please mention required skills');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('Please login to post a job');
      router.push('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const skillsArray = formData.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: {
          address: formData.location,
          city: formData.city,
          lat: 0,
          lng: 0,
        },
        salary: {
          min: formData.minSalary,
          max: formData.maxSalary,
          currency: 'INR',
          period: formData.jobType === 'Daily Wage' ? 'daily' : 'monthly',
        },
        jobType: formData.jobType,
        experience: formData.experience,
        skills: skillsArray,
        postedBy: user.id || 'anonymous',
        status: 'active',
        totalApplicants: 0,
        applicants: [],
      };

      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        city: '',
        minSalary: 0,
        maxSalary: 0,
        jobType: '',
        experience: '',
        skills: '',
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/jobs');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-8 pb-16">
      <div className="container-padding max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Post a Job
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Fill in all the details to post a new job opportunity
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">Job posted successfully!</h3>
              <p className="text-sm text-green-700 dark:text-green-300">Redirecting to jobs page...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">Error</h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Job Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Construction Laborer, Delivery Executive"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Job Description <span className="text-red-600">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the job, responsibilities, and requirements..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Location <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Downtown Delhi, Marine Drive"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                City <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., Delhi, Mumbai"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>
          </div>

          {/* Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Min Salary (₹) <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleInputChange}
                  placeholder="500"
                  min="0"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Max Salary (₹) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleInputChange}
                placeholder="1000"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>
          </div>

          {/* Job Type and Experience */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Job Type <span className="text-red-600">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              >
                <option value="">Select type</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Experience Required <span className="text-red-600">*</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              >
                <option value="">Select level</option>
                {experienceOptions.map(exp => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Required Skills <span className="text-red-600">*</span>
            </label>
            <div className="flex items-start space-x-2">
              <Briefcase className="w-5 h-5 text-gray-400 flex-shrink-0 mt-3" />
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Separate multiple skills with commas. e.g., Digging, Material handling, Safety awareness"
                rows={3}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">💡 Tip: Use commas to separate multiple skills</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={loading || success}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                loading || success
                  ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Briefcase className="w-5 h-5" />
                  <span>Post Job</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 rounded-lg font-semibold bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            ✓ All fields marked with * are required
          </p>
        </form>
      </div>
    </div>
  );
}
