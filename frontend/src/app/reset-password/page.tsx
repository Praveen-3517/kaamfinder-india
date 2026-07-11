'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const onSubmit = async (data: any) => {
    if (!token) return;
    
    setLoading(true);
    setError('');
    
    try {
      await api.post('/auth/reset-password', { 
        token, 
        newPassword: data.password 
      });
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const password = watch('password');

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md card text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Password Reset
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your password has been successfully reset. You will be redirected to the login page shortly.
          </p>
          <div className="pt-4">
            <Link href="/login" className="btn-primary w-full block">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Set New Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please enter your new password below.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <div className="flex items-center input-field px-0">
                <Lock className="w-5 h-5 text-gray-400 px-3" />
                <input
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="bg-transparent flex-1 outline-none text-gray-900 dark:text-white placeholder-gray-500 py-3"
                  disabled={!token}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password?.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <div className="flex items-center input-field px-0">
                <Lock className="w-5 h-5 text-gray-400 px-3" />
                <input
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="bg-transparent flex-1 outline-none text-gray-900 dark:text-white placeholder-gray-500 py-3"
                  disabled={!token}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message as string}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
