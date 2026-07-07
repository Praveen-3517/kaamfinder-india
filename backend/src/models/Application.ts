import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  employerId: mongoose.Types.ObjectId;
  status: 'applied' | 'shortlisted' | 'rejected' | 'accepted' | 'completed';
  appliedAt: Date;
  appliedVia: 'direct' | 'whatsapp' | 'call';
  notes?: string;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'accepted', 'completed'],
      default: 'applied',
    },
    appliedVia: {
      type: String,
      enum: ['direct', 'whatsapp', 'call'],
      default: 'direct',
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model<IApplication>('Application', applicationSchema);
