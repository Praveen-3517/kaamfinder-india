'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-700">
      <div className="container-padding max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Kaam<span className="text-primary-500">Finder</span>
            </h3>
            <p className="text-gray-300 text-sm">
              Connecting workers and employers across India for better job opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-gray-300 hover:text-primary-500 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/post-job" className="text-gray-300 hover:text-primary-500 transition-colors">Post Job</Link></li>
              <li><Link href="/dashboard" className="text-gray-300 hover:text-primary-500 transition-colors">Dashboard</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-primary-500 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* For Workers */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Workers</h4>
            <ul className="space-y-2">
              <li><Link href="/register?role=worker" className="text-gray-300 hover:text-primary-500 transition-colors">Get Started</Link></li>
              <li><Link href="/browse-jobs" className="text-gray-300 hover:text-primary-500 transition-colors">Find Jobs</Link></li>
              <li><Link href="/skills" className="text-gray-300 hover:text-primary-500 transition-colors">Add Skills</Link></li>
              <li><Link href="/help" className="text-gray-300 hover:text-primary-500 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Mumbai, India</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href="mailto:support@kaamfinder.com" className="text-gray-300 hover:text-primary-500 text-sm transition-colors">support@kaamfinder.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-primary-500 text-sm transition-colors">+91 9876543210</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} KaamFinder India. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
