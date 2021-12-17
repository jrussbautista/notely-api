import mongoose from 'mongoose';

export const connectDb = async () => {
  const conn = await mongoose.connect(`${process.env.DATABASE_URI}`);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
