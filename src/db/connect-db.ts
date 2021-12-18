import mongoose from 'mongoose';

export const connectDb = async () => {
  return await mongoose.connect(`${process.env.DATABASE_URI}`);
};
