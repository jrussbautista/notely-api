import mongoose from 'mongoose';

import { User } from '../../src/model/User';
import { Task } from '../../src/model/Task';
import { connectDb } from '../../src/db/connect-db';

const userOneId = new mongoose.Types.ObjectId();

export const user1 = {
  _id: userOneId,
  name: 'Test1 User',
  email: 'test1@example.com',
  password: 'password',
};

export const setupTestDatabase = async () => {
  await connectDb();
  await User.deleteMany();
  await Task.deleteMany();
  await new User(user1).save();
};
