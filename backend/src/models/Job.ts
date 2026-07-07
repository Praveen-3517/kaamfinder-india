import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  company: mongoose.Types.ObjectId;
  category: string;
  location: {
    address: string;
    lat: number;
    lng: number;
    city: string;
    state: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'annual';
  };
  jobType: 'Full-time' | 'Part-time' | 'Daily Wage' | 'Contract' | 'Freelance';
  experience: string;
  skills: string[];
  applicants: mongoose.Types.ObjectId[];
  totalApplicants: number;
  status: 'active' | 'closed' | 'draft';
  postedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Labour', 'Driver', 'Delivery', 'Construction', 'Factory',
        'Office', 'Cleaning', 'Electrician', 'Plumbing', 'Security',
        'Freelancer', 'Student', 'Other'
      ],
    },
    location: {
      address: String,
      lat: Number,
      lng: Number,
      city: String,
      state: String,
    },
    salary: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' },
      period: {
        type: String,
        enum: ['hourly', 'daily', 'weekly', 'monthly', 'annual'],
        default: 'daily',
      },
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Daily Wage', 'Contract', 'Freelance'],
      default: 'Daily Wage',
    },
    experience: String,
    skills: [String],
    applicants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    totalApplicants: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'active',
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', jobSchema);
