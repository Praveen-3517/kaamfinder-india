"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kaamfinder';
        await mongoose_1.default.connect(mongoUri);
        console.log('✅ MongoDB connected successfully');
    }
    catch (error) {
        console.log('⚠️  MongoDB not available. Running in mock mode.');
        console.log('📝 Install MongoDB locally or use MongoDB Atlas (https://www.mongodb.com/cloud/atlas)');
        console.log('📖 See ENV_GUIDE.md for setup instructions\n');
        // Don't exit - allow the app to run with mock data
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map