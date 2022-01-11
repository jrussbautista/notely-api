import { Schema, model } from 'mongoose';
import { Note as NoteType } from '../types/Note';

const { ObjectId } = Schema.Types;

const NoteSchema = new Schema<NoteType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model<NoteType>('Note', NoteSchema);
