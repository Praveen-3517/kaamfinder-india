import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IApplication, {}, {}, {}, mongoose.Document<unknown, {}, IApplication, {}, {}> & IApplication & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Application.d.ts.map