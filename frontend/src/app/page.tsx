'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Users, Star, ArrowRight } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import CategoryCard from '@/components/home/CategoryCard';
import { useAuth } from '@/context/AuthContext';

const categories = [
  { id: 1, name: 'Labour', icon: 'hammer', count: 1250 },
  { id: 2, name: 'Driver', icon: 'truck', count: 890 },
  { id: 3, name: 'Delivery', icon: 'package', count: 650 },
  { id: 4, name: 'Construction', icon: 'building', count: 420 },
  { id: 5, name: 'Factory', icon: 'factory', count: 380 },
  { id: 6, name: 'Office', icon: 'briefcase', count: 1100 },
  { id: 7, name: 'Cleaning', icon: 'sparkles', count: 290 },
  { id: 8, name: 'Electrician', icon: 'zap', count: 160 },
  { id: 9, name: 'Plumbing', icon: 'wrench', count: 140 },
  { id: 10, name: 'Security', icon: 'shield', count: 220 },
];

const featuredJobs = [
  {
    id: '1',
    title: 'Construction Laborer',
    company: 'BuildPro Solutions',
    location: 'Mumbai, Maharashtra',
    salary: '₹500-800/day',
    type: 'Daily Wage',
    distance: '2.5 km',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Delivery Executive',
    company: 'FastDeliver Inc',
    location: 'Bangalore, Karnataka',
    salary: '₹300-600/day',
    type: 'Daily Wage',
    distance: '1.2 km',
    rating: 4.2,
  },
  {
    id: '3',
    title: 'Electrician',
    company: 'Power Services Ltd',
    location: 'Delhi, NCR',
    salary: '₹600-1200/day',
    type: 'Part-time',
    distance: '3.8 km',
    rating: 4.7,
  },
];

export default function Home() {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/jobs?location=${location}&search=${searchQuery}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              Find Local Jobs <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Near You</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover thousands of job opportunities across India - from daily wage workers to office jobs. Find your perfect match today!
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center space-x-3 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-slate-700">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent flex-1 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div className="flex-1 flex items-center space-x-3 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-slate-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City or location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent flex-1 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <button type="submit" className="btn-primary md:px-8 whitespace-nowrap">
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button className="flex items-center justify-center space-x-2 btn-secondary">
                <MapPin className="w-5 h-5" />
                <span>Find Jobs Near Me</span>
              </button>
              <button className="flex items-center justify-center space-x-2 btn-outline">
                <Briefcase className="w-5 h-5" />
                <span>Post a Job</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-spacing bg-white dark:bg-slate-900">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Popular Job Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Browse jobs by category and find your ideal opportunity
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="section-spacing bg-gray-50 dark:bg-slate-800">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                Featured Jobs
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Latest opportunities posted today
              </p>
            </div>
            <a href="/jobs" className="hidden md:flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>

          <div className="md:hidden text-center">
            <a href="/jobs" className="btn-primary">
              Browse All Jobs
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-white dark:bg-slate-900">
        <div className="container-padding max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose KaamFinder?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: '10K+ Employers', desc: 'Trusted by thousands of businesses' },
              { icon: Briefcase, title: 'Diverse Jobs', desc: 'All types of work opportunities' },
              { icon: MapPin, title: 'Near You', desc: 'Find jobs within your locality' },
              { icon: Star, title: 'Quality Profiles', desc: 'Verified workers and employers' },
            ].map((feature, idx) => (
              <div key={idx} className="card text-center">
                <feature.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="section-spacing bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container-padding max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Job?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Join thousands of workers and employers who are already using KaamFinder
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/register?role=worker" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Sign Up as Worker
              </a>
              <a href="/register?role=employer" className="bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors border-2 border-white">
                Sign Up as Employer
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
