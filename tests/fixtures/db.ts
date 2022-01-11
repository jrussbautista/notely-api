import mongoose from 'mongoose';

import { User } from '../../src/model/User';
import { Note } from '../../src/model/Note';
import { connectDb } from '../../src/db/connect-db';
import { User as UserType } from '../../src/types/User';
import { generateToken } from '../../src/lib/jwt';

type UserWithPassword = Omit<UserType, 'createdAt' | 'updatedAt'> & {
  password?: string;
};

export const user1: UserWithPassword = {
  _id: '61d6f4d43fbad8f24b57c232',
  name: 'Test1 User',
  email: 'test1@example.com',
  password: 'password',
};

export const user2: UserWithPassword = {
  _id: '61d6f525884a2969cfa0b8bf',
  name: 'Test2 User',
  email: 'test2@example.com',
  password: 'password',
};

export const user1Note1 = {
  _id: new mongoose.Types.ObjectId(),
  title: 'First note',
  description: 'First note desc',
  user: user1._id,
};

export const user1Note2 = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Second note',
  description: 'First note desc',
  user: user1._id,
};

export const generateUserToken = (userId: string) =>
  generateToken({ userId }, `${process.env.JWT_SECRET_KEY}`, '1hr');

export const setupTestDatabase = async () => {
  await connectDb();
  await User.deleteMany();
  await Note.deleteMany();
  await new User(user1).save();
  await new User(user2).save();
  await new Note(user1Note1).save();
  await new Note(user1Note2).save();
};
