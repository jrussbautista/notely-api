import { Request, Response } from 'express';

import { User } from '../model/User';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(422).json({ message: 'Email is already taken.' });
    }

    const user = await User.create({
      email,
      password,
      name,
    });

    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email }).select('+password');

    if (!findUser) {
      return res.status(401).json({ message: 'Email or Password is incorrect.' });
    }

    const isPasswordMatch = findUser.matchesPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Email or Password is incorrect.' });
    }

    findUser.password = undefined;

    res.json(findUser);
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};
