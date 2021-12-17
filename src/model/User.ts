import { Schema, model } from 'mongoose';
import { User as UserType } from '../types/User';

type UserWithPassword = UserType & {
  password: string;
};

const UserSchema = new Schema<UserWithPassword>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserWithPassword>('User', UserSchema);
