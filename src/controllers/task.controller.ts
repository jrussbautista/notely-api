import { Request, Response } from 'express';

import { Task } from '../model/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
      user: '61bc99ad6778fd8ed391047b',
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};
