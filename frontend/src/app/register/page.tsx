'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';


export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'worker';
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const password = watch('password');

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      if (data.password !== data.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      await registerUser({ ...data, role });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join KaamFinder as a {role === 'worker' ? 'Worker' : 'Employer'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  type="text"
                  placeholder="John"
                  className="input-field"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName?.message as string}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  type="text"
                  placeholder="Doe"
                  className="input-field"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName?.message as string}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="you@example.com"
                className="input-field"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                type="tel"
                placeholder="+91 9876543210"
                className="input-field"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone?.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-field"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password?.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword', { required: 'Please confirm your password' })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-field"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message as string}</p>}
            </div>

            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 rounded" required />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:underline">
                  Terms and Conditions
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
