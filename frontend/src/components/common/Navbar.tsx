'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <MapPin className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-primary-600 dark:text-primary-400 group-hover:text-primary-700 transition-colors">
              Kaam<span className="text-secondary-500">Finder</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Browse Jobs
            </Link>
            <Link href="/post-job" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
              Post A Job
            </Link>
            <Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Language Toggle */}
            <select className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border-0 cursor-pointer">
              <option>English</option>
              <option>हिंदी</option>
            </select>

            {/* Auth */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="px-4 py-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-800"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 border-t border-gray-200 dark:border-slate-700 pt-4">
            <Link href="/jobs" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600">
              Browse Jobs
            </Link>
            <Link href="/post-job" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium">
              Post A Job
            </Link>
            <Link href="/categories" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600">
              Categories
            </Link>
            <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600">
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600">
              Contact
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block btn-primary">
                  Dashboard
                </Link>
                <button onClick={logout} className="w-full text-left text-red-600 hover:text-red-700">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block btn-outline">
                  Login
                </Link>
                <Link href="/register" className="block btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
