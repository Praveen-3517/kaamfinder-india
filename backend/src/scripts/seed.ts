import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Job from '../models/Job';
import Company from '../models/Company';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaamfinder');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const workers = await User.insertMany([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@kaamfinder.com',
        phone: '+919876543210',
        password: 'password123',
        role: 'worker',
        location: { address: '123 Main St', lat: 19.0760, lng: 72.8777, city: 'Mumbai', state: 'Maharashtra' },
        skills: ['Carpentry', 'Welding'],
        experience: '5 years',
        isVerified: true,
      },
      {
        name: 'Priya Singh',
        email: 'priya@kaamfinder.com',
        phone: '+919876543211',
        password: 'password123',
        role: 'worker',
        location: { address: '456 Side St', lat: 19.0800, lng: 72.8800, city: 'Mumbai', state: 'Maharashtra' },
        skills: ['Plumbing', 'Electrical'],
        experience: '3 years',
        isVerified: true,
      },
    ]);

    const employers = await User.insertMany([
      {
        name: 'BuildPro Solutions',
        email: 'buildpro@company.com',
        phone: '+919876543220',
        password: 'password123',
        role: 'employer',
        location: { address: '789 Business Park', lat: 19.0850, lng: 72.8850, city: 'Mumbai', state: 'Maharashtra' },
        isVerified: true,
      },
      {
        name: 'FastDeliver Inc',
        email: 'fastdeliver@company.com',
        phone: '+919876543221',
        password: 'password123',
        role: 'employer',
        location: { address: '321 Commerce St', lat: 28.6139, lng: 77.2090, city: 'Delhi', state: 'Delhi' },
        isVerified: true,
      },
    ]);

    console.log('Created sample users');

    // Create sample companies
    const companies = await Company.insertMany([
      {
        name: 'BuildPro Solutions',
        email: 'contact@buildpro.com',
        phone: '+919876543220',
        description: 'Leading construction company in India',
        website: 'www.buildpro.com',
        location: { address: '789 Business Park', lat: 19.0850, lng: 72.8850, city: 'Mumbai', state: 'Maharashtra' },
        owner: employers[0]._id,
        totalJobs: 0,
      },
      {
        name: 'FastDeliver Inc',
        email: 'contact@fastdeliver.com',
        phone: '+919876543221',
        description: 'Fastest delivery service in India',
        website: 'www.fastdeliver.com',
        location: { address: '321 Commerce St', lat: 28.6139, lng: 77.2090, city: 'Delhi', state: 'Delhi' },
        owner: employers[1]._id,
        totalJobs: 0,
      },
    ]);

    console.log('Created sample companies');

    // Create sample jobs
    const jobs = await Job.insertMany([
      {
        title: 'Construction Laborer',
        description: 'We are looking for experienced construction laborers for ongoing projects',
        company: companies[0]._id,
        category: 'Construction',
        location: { address: '123 Construction Site', lat: 19.0760, lng: 72.8777, city: 'Mumbai', state: 'Maharashtra' },
        salary: { min: 500, max: 800, currency: 'INR', period: 'daily' },
        jobType: 'Daily Wage',
        experience: '1-2 years',
        skills: ['Manual Labor', 'Carpentry'],
        status: 'active',
        postedBy: employers[0]._id,
        totalApplicants: 0,
        applicants: [],
      },
      {
        title: 'Delivery Executive',
        description: 'Deliver packages across the city. Must have vehicle and valid license',
        company: companies[1]._id,
        category: 'Delivery',
        location: { address: '456 Delivery Hub', lat: 28.6139, lng: 77.2090, city: 'Delhi', state: 'Delhi' },
        salary: { min: 300, max: 600, currency: 'INR', period: 'daily' },
        jobType: 'Daily Wage',
        experience: 'Fresher',
        skills: ['Driving', 'Communication'],
        status: 'active',
        postedBy: employers[1]._id,
        totalApplicants: 0,
        applicants: [],
      },
      {
        title: 'Plumber',
        description: 'Experienced plumber for residential and commercial projects',
        company: companies[0]._id,
        category: 'Plumbing',
        location: { address: '789 Service Center', lat: 19.0850, lng: 72.8850, city: 'Mumbai', state: 'Maharashtra' },
        salary: { min: 600, max: 1200, currency: 'INR', period: 'daily' },
        jobType: 'Part-time',
        experience: '3+ years',
        skills: ['Plumbing', 'Pipe Fitting'],
        status: 'active',
        postedBy: employers[0]._id,
        totalApplicants: 0,
        applicants: [],
      },
    ]);

    console.log('Created sample jobs');
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
