import { Schema, model } from 'mongoose';
import { Task as TaskType } from '../types/Task';

const { ObjectId } = Schema.Types;

const TaskSchema = new Schema<TaskType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<TaskType>('Task', TaskSchema);
