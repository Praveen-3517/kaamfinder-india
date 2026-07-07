import { useState } from 'react';

export interface FilterState {
  location: string;
  distance: number;
  salary: { min: number; max: number };
  jobType: string[];
  experience: string;
  category: string[];
}

export function useJobFilters() {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    distance: 10,
    salary: { min: 0, max: 100000 },
    jobType: [],
    experience: '',
    category: [],
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      distance: 10,
      salary: { min: 0, max: 100000 },
      jobType: [],
      experience: '',
      category: [],
    });
  };

  return { filters, updateFilter, resetFilters };
}
