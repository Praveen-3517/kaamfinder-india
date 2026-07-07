'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Briefcase, DollarSign, Star, Phone, Mail, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { jobsAPI } from '@/lib/api';

export const dynamic = 'force-dynamic';


export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id;
  const { user } = useAuth();
  const [job, setJob] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [applying, setApplying] = React.useState(false);

  React.useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobsAPI.getById(jobId as string);
        setJob(response.data.job);
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setApplying(true);
    try {
      await jobsAPI.create(jobId as string);
      alert('Application submitted successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center card">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Job not found</h1>
          <Link href="/jobs" className="btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <div className="container-padding max-w-4xl mx-auto py-8">
        {/* Back Button */}
        <Link href="/jobs" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Jobs</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{job.company?.name}</p>
                </div>
                <button className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                  <Bookmark className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Job Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{job.jobType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{job.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{job.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Applicants</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{job.totalApplicants}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{job.description}</p>

              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Requirements</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills?.map((skill: string) => (
                  <span key={skill} className="badge-primary">{skill}</span>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Location</h3>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-6">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span>{job.location?.address}</span>
              </div>
            </div>

            {/* Employer Info */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">About Employer</h3>
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 dark:border-slate-700 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{job.company?.name}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">4.5 (23 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href="mailto:contact@company.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Contact Employer
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href="tel:+919876543210" className="text-primary-600 dark:text-primary-400 hover:underline">
                    +91 9876543210
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Salary Card */}
            <div className="card mb-6 text-center">
              <DollarSign className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Salary</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{job.salary?.min} - ₹{job.salary?.max}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Per {job.salary?.period}
              </p>
            </div>

            {/* Apply Button */}
            {user && user.role === 'worker' ? (
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full btn-primary mb-4 disabled:opacity-50"
              >
                {applying ? 'Applying...' : 'Apply Now'}
              </button>
            ) : !user ? (
              <Link href="/login" className="w-full btn-primary text-center block mb-4">
                Login to Apply
              </Link>
            ) : null}

            {/* Quick Apply Options */}
            <div className="card space-y-2">
              <p className="font-semibold text-gray-900 dark:text-white mb-4">Quick Apply</p>
              <button className="w-full flex items-center justify-center space-x-2 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xl">📱</span>
                <span className="text-sm">WhatsApp Message</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xl">☎️</span>
                <span className="text-sm">Call Employer</span>
              </button>
            </div>

            {/* Share */}
            <button className="w-full mt-4 flex items-center justify-center space-x-2 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-gray-300">
              <Share2 className="w-4 h-4" />
              <span>Share Job</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
