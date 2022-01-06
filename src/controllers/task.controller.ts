import { Request, Response } from 'express';

import { Task } from '../model/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const tasks = await Task.find({ user: user._id });
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    if (user._id.toString() !== task?.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      user: user._id,
      description,
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({ message: 'Task not found.' });
    }

    if (task.user._id !== user._id) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};
