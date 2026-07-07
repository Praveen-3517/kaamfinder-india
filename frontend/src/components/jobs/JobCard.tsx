'use client';

import React from 'react';
import { Star, MapPin, Briefcase, DollarSign, Calendar } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
  _id?: string;
  id?: string;
  title: string;
  company?: any;
  location?: any;
  salary?: any;
  jobType?: string;
  type?: string;
  distance?: string;
  rating?: number;
  image?: string;
  category?: string;
}

export default function JobCard({
  _id,
  id,
  title,
  company,
  location,
  salary,
  jobType,
  type,
  distance,
  rating,
  image,
  category,
}: JobCardProps) {
  const jobId = _id || id;
  const companyName = typeof company === 'string' ? company : company?.name || 'Company';
  const locationText = location?.city ? `${location.city}, ${location.state || ''}`.trim() : location?.address || 'Location not specified';
  const salaryText = salary ? `₹${salary.min} - ₹${salary.max}/${salary.period || 'day'}` : 'Salary not specified';
  const jobTypeText = jobType || type || 'Not specified';

  return (
    <Link href={`/jobs/${jobId}`}>
      <div className="card hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{companyName}</p>
          </div>
          {rating && (
            <div className="flex items-center space-x-1 ml-4">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-primary-500" />
            <span>{locationText}</span>
            {distance && <span className="text-primary-600 dark:text-primary-400 font-semibold">{distance}</span>}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4 text-secondary-500" />
            <span className="font-semibold text-gray-900 dark:text-white">{salaryText}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Briefcase className="w-4 h-4" />
            <span className="badge-primary">{jobTypeText}</span>
          </div>
        </div>

        <button className="w-full btn-primary text-sm py-2">
          View Details
        </button>
      </div>
    </Link>
  );
}
