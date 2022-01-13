import { Schema, model } from 'mongoose';
import { Note as NoteType } from '../types/Note';

const { ObjectId, Date } = Schema.Types;

const NoteSchema = new Schema<NoteType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    deletedAt: { type: Date, default: null },
    isFavorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Note = model<NoteType>('Note', NoteSchema);
