import { User } from './User';

export type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};
