import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ICompany, {}, {}, {}, mongoose.Document<unknown, {}, ICompany, {}, {}> & ICompany & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Company.d.ts.map