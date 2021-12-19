import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

import { User as UserType } from '../types/User';

type UserWithPassword = UserType & {
  password?: string;
  matchesPassword(password: string): boolean;
};

type UserDocument = Document & UserWithPassword & {};

const UserSchema = new Schema<UserWithPassword>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true, select: false },
  },
  {
    timestamps: true,
  }
);

// hash password
UserSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    if (this.password) {
      const hash = bcrypt.hashSync(this.password.toString(), 10);
      this.password = hash;
    }
  }
});

// check if password matches the hash password
UserSchema.methods.matchesPassword = function (password: string) {
  if (!this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

export const User = model<UserWithPassword>('User', UserSchema);
