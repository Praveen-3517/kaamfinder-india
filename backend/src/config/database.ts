import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kaamfinder';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.log('⚠️  MongoDB not available. Running in mock mode.');
    console.log('📝 Install MongoDB locally or use MongoDB Atlas (https://www.mongodb.com/cloud/atlas)');
    console.log('📖 See ENV_GUIDE.md for setup instructions\n');
    // Don't exit - allow the app to run with mock data
  }
};

