import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  email: string;
  phone: string;
  logo?: string;
  description?: string;
  website?: string;
  location: {
    address: string;
    lat?: number;
    lng?: number;
    city: string;
    state: string;
  };
  owner: mongoose.Types.ObjectId;
  employees?: mongoose.Types.ObjectId[];
  totalJobs: number;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    logo: String,
    description: String,
    website: String,
    location: {
      address: String,
      lat: Number,
      lng: Number,
      city: String,
      state: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employees: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    totalJobs: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICompany>('Company', companySchema);
