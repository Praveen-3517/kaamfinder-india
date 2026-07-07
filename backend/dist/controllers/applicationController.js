"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationStats = exports.updateApplicationStatus = exports.getJobApplications = exports.getMyApplications = void 0;
const Application_1 = __importDefault(require("../models/Application"));
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application_1.default.find({ userId: req.user?.id })
            .populate('jobId')
            .populate('employerId', 'name email')
            .sort({ createdAt: -1 });
        res.json({ applications });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getMyApplications = getMyApplications;
const getJobApplications = async (req, res) => {
    try {
        const applications = await Application_1.default.find({ jobId: req.params.jobId })
            .populate('userId', 'name email phone avatar')
            .sort({ createdAt: -1 });
        res.json({ applications });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getJobApplications = getJobApplications;
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json({
            message: 'Application status updated',
            application,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
const getApplicationStats = async (req, res) => {
    try {
        const stats = {
            totalApplications: await Application_1.default.countDocuments({ userId: req.user?.id }),
            applied: await Application_1.default.countDocuments({ userId: req.user?.id, status: 'applied' }),
            shortlisted: await Application_1.default.countDocuments({ userId: req.user?.id, status: 'shortlisted' }),
            rejected: await Application_1.default.countDocuments({ userId: req.user?.id, status: 'rejected' }),
            accepted: await Application_1.default.countDocuments({ userId: req.user?.id, status: 'accepted' }),
        };
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getApplicationStats = getApplicationStats;
//# sourceMappingURL=applicationController.js.map