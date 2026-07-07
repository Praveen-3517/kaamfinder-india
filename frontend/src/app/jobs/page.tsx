'use client';

import React, { useState, useEffect } from 'react';
import { Filter, Search as SearchIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import JobCard from '@/components/jobs/JobCard';
import { useJobFilters } from '@/hooks/useJobFilters';
import { jobsAPI } from '@/lib/api';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const { filters, updateFilter } = useJobFilters();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [filters, searchParams]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const search = searchParams.get('search') || '';
      const location = searchParams.get('location') || filters.location;
      const response = await jobsAPI.search({
        search,
        location,
        category: filters.category.join(','),
        jobType: filters.jobType.join(','),
      });
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const jobCategories = [
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
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Daily Wage', 'Contract', 'Freelance'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <div className="container-padding max-w-7xl mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Browse Jobs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Find your perfect job opportunity
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500"
                >
                  ✕
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or area"
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Distance Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Distance: {filters.distance}km
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={filters.distance}
                  onChange={(e) => updateFilter('distance', Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Salary Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Salary Range
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.salary.min}
                    onChange={(e) =>
                      updateFilter('salary', {
                        ...filters.salary,
                        min: Number(e.target.value),
                      })
                    }
                    className="input-field"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.salary.max}
                    onChange={(e) =>
                      updateFilter('salary', {
                        ...filters.salary,
                        max: Number(e.target.value),
                      })
                    }
                    className="input-field"
                  />
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Job Type
                </label>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilter('jobType', [...filters.jobType, type]);
                          } else {
                            updateFilter(
                              'jobType',
                              filters.jobType.filter((t) => t !== type)
                            );
                          }
                        }}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <div className="space-y-2">
                  {jobCategories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilter('category', [...filters.category, category]);
                          } else {
                            updateFilter(
                              'category',
                              filters.category.filter((c) => c !== category)
                            );
                          }
                        }}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden btn-outline mb-6 w-full flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Show Filters</span>
            </button>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading jobs...</p>
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} {...job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters to find more opportunities
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
