import { User } from './User';

export type Note = {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  user: User;
};
