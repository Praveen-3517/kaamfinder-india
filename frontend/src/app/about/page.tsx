'use client';

import React from 'react';
import { Users, Target, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container-padding max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About KaamFinder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connecting workers with opportunities across India
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-spacing">
        <div className="container-padding max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            KaamFinder was founded with a simple mission: to make finding work easier for millions of Indians. We believed that everyone deserves access to quality job opportunities, regardless of their background or location.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            From daily wage workers to office professionals, we're building a platform that connects talent with opportunity across India.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-gray-50 dark:bg-slate-800">
        <div className="container-padding max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Focused', desc: 'Laser-focused on solving real problems' },
              { icon: Users, title: 'Community', desc: 'Building a supportive community' },
              { icon: Heart, title: 'Inclusive', desc: 'Accessible to everyone' },
              { icon: Zap, title: 'Innovation', desc: 'Always improving our platform' },
            ].map((value, idx) => (
              <div key={idx} className="card text-center">
                <value.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing">
        <div className="container-padding max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { number: '100K+', label: 'Active Users' },
              { number: '50K+', label: 'Jobs Posted' },
              { number: '25 States', label: 'Coverage' },
              { number: '4.8/5', label: 'Rating' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-padding max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-primary-100 mb-8">
            Join thousands of workers and employers on KaamFinder
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
    </div>
  );
}
