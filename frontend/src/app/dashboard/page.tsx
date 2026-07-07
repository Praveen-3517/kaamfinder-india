'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Briefcase, FileText, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user?.name}</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-6 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 p-6 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 bg-gray-100 dark:bg-slate-800 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content */}
        <div className="p-6 container-padding max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Profile Views', value: '1,234', icon: '👁️' },
                { label: 'Applications', value: '12', icon: '📄' },
                { label: 'Saved Jobs', value: '45', icon: '❤️' },
                { label: 'Messages', value: '8', icon: '💬' },
              ].map((stat, idx) => (
                <div key={idx} className="card text-center">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card max-w-2xl">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(' ')[0]}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(' ')[1] || ''}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="input-field"
                    disabled
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              {[
                { job: 'Construction Laborer', company: 'BuildPro', status: 'Pending', date: '2 days ago' },
                { job: 'Delivery Executive', company: 'FastDeliver', status: 'Accepted', date: '5 days ago' },
              ].map((app, idx) => (
                <div key={idx} className="card flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{app.job}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{app.company} • {app.date}</p>
                  </div>
                  <span className={`badge ${
                    app.status === 'Accepted' ? 'badge-success' : 'badge-primary'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div className="text-center py-12 card">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved jobs yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Start browsing jobs to save your favorites</p>
              <a href="/jobs" className="btn-primary inline-block">
                Browse Jobs
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
