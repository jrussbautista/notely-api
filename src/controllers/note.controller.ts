import { Request, Response } from 'express';

import { Note } from '../model/Note';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const notes = await Note.find({ user: user._id, deletedAt: null });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const note = await Note.findOne({ _id: id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    if (user._id.toString() !== note?.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const addNote = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { title, description } = req.body;

    const note = await Note.create({
      title,
      user: user._id,
      description,
    });
    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const note = await Note.findOneAndUpdate(
      { _id: id, user },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { user } = req;
    const { id } = req.params;

    const note = await Note.findOneAndUpdate(
      { _id: id, user },
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(202).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const getTrashNotes = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const notes = await Note.find({ user: user._id, deletedAt: { $ne: null } });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const restoreNote = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const note = await Note.findOneAndUpdate(
      { _id: id, user, deletedAt: { $ne: null } },
      { deletedAt: null },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(202).json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};
