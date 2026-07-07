import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  ratedBy: mongoose.Types.ObjectId;
  ratedTo: mongoose.Types.ObjectId;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    ratedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ratedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>('Review', reviewSchema);
