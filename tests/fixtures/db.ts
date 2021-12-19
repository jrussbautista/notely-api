import mongoose from 'mongoose';

import { User } from '../../src/model/User';
import { Task } from '../../src/model/Task';
import { connectDb } from '../../src/db/connect-db';
import { User as UserType } from '../../src/types/User';

const userOneId = new mongoose.Types.ObjectId();

type UserWithPassword = UserType & {
  password?: string;
};

export const user1: UserWithPassword = {
  _id: String(userOneId),
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
