// Mock Database for Development/Testing
// This allows running the app without MongoDB installed

const mockData: any = {
  users: [
    {
      _id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@kaamfinder.com',
      phone: '9876543210',
      role: 'worker',
      location: { address: 'Delhi', lat: 28.7041, lng: 77.1025 },
      skills: ['Carpentry', 'Welding'],
      bio: 'Experienced carpenter',
      isVerified: true,
      rating: 4.5,
      totalReviews: 12,
    },
    {
      _id: '2',
      name: 'Priya Singh',
      email: 'priya@kaamfinder.com',
      phone: '9876543211',
      role: 'worker',
      location: { address: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      skills: ['Plumbing', 'Electrical'],
      bio: 'Skilled plumber',
      isVerified: true,
      rating: 4.8,
      totalReviews: 20,
    },
  ],
  jobs: [
    {
      _id: '1',
      title: 'Construction Laborer',
      description: 'Need experienced laborer for construction project',
      category: 'Construction',
      location: { address: 'Delhi', lat: 28.7041, lng: 77.1025, city: 'Delhi' },
      salary: { min: 500, max: 800, currency: 'INR', period: 'daily' },
      jobType: 'Daily Wage',
      experience: '2-3 years',
      skills: ['Digging', 'Material handling'],
      applicants: [],
      totalApplicants: 0,
      status: 'active',
      postedBy: '2',
    },
    {
      _id: '2',
      title: 'Delivery Executive',
      description: 'Delivery boy needed for fast delivery service',
      category: 'Delivery',
      location: { address: 'Mumbai', lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
      salary: { min: 300, max: 600, currency: 'INR', period: 'daily' },
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['Bike riding', 'Navigation'],
      applicants: [],
      totalApplicants: 0,
      status: 'active',
      postedBy: '2',
    },
  ],
  applications: [],
  companies: [],
  reviews: [],
};

export const getMockData = () => mockData;
export const addUser = (user: any) => {
  mockData.users.push(user);
  return user;
};
export const addJob = (job: any) => {
  mockData.jobs.push(job);
  return job;
};
