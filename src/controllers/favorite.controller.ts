import { Request, Response } from 'express';

import { Note } from '../model/Note';

export const getFavoriteNotes = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const notes = await Note.find({ user: user._id, deletedAt: { $ne: null }, isFavorite: true });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const toggleFavoriteNote = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    let note = await Note.findOne({ _id: id, user: user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    note = await Note.findOneAndUpdate({ id }, { isFavorite: !note?.isFavorite }, { new: true });

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};
