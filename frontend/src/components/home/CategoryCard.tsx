'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Hammer, Truck, Package, Building2, Factory, Briefcase, 
  Sparkles, Zap, Wrench, Shield, Hand, Code 
} from 'lucide-react';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: string;
  count: number;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  hammer: Hammer,
  truck: Truck,
  package: Package,
  building: Building2,
  factory: Factory,
  briefcase: Briefcase,
  sparkles: Sparkles,
  zap: Zap,
  wrench: Wrench,
  shield: Shield,
  hand: Hand,
  code: Code,
};

export default function CategoryCard({ id, name, icon, count }: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Briefcase;

  return (
    <Link href={`/jobs?category=${name.toLowerCase()}`}>
      <div className="card text-center group hover:bg-primary-50 dark:hover:bg-slate-800">
        <div className="mb-3 flex justify-center">
          <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:scale-110 transition-transform">
            <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{count} jobs</p>
      </div>
    </Link>
  );
}
