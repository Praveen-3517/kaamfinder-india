import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'worker' | 'employer' | 'admin';
  avatar?: string;
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  skills?: string[];
  bio?: string;
  experience?: string;
  isVerified: boolean;
  status: 'active' | 'inactive' | 'blocked';
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['worker', 'employer', 'admin'],
      default: 'worker',
    },
    avatar: String,
    location: {
      address: String,
      lat: Number,
      lng: Number,
    },
    skills: [String],
    bio: String,
    experience: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active',
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
