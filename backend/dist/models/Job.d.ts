import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, {}> & IJob & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Job.d.ts.map