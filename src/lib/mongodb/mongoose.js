import mongoose from 'mongoose';

let isConnected = false; // Track connection state

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('✅ MongoDB is already connected');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'nextjs13',
    });

    isConnected = db.connections[0].readyState === 1;
    console.log('🚀 MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  }
};
