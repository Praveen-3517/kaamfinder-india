import mongoose, { Document } from 'mongoose';
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
    comparePassword: (password: string) => Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map