'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [simulatedLink, setSimulatedLink] = useState('');

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await api.post('/auth/forgot-password', { email: data.email });
      setSuccess(true);
      if (response.data.simulatedLink) {
        setSimulatedLink(response.data.simulatedLink);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  const getRelativeLink = (fullLink: string) => {
    try {
      const url = new URL(fullLink);
      return url.pathname + url.search;
    } catch (e) {
      // If it fails to parse (e.g. localhost during dev without NEXT_PUBLIC_FRONTEND_URL), try extracting query manually
      const parts = fullLink.split('/reset-password');
      return '/reset-password' + (parts.length > 1 ? parts[1] : '');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="mb-6">
            <Link href="/login" className="flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to login
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Check your email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We've sent password reset instructions to your email address.
              </p>
              
              {simulatedLink && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-left">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    [Development Mode] Simulated Email Link:
                  </p>
                  <Link href={getRelativeLink(simulatedLink)} className="text-sm text-blue-600 dark:text-blue-400 break-all hover:underline">
                    Click here to reset password
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="flex items-center input-field px-0">
                  <Mail className="w-5 h-5 text-gray-400 px-3" />
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    placeholder="you@example.com"
                    className="bg-transparent flex-1 outline-none text-gray-900 dark:text-white placeholder-gray-500 py-3"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message as string}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
