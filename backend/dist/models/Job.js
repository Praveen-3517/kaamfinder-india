"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const jobSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Job', jobSchema);
//# sourceMappingURL=Job.js.map