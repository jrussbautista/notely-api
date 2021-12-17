import { User } from './User';

export type Task = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};
