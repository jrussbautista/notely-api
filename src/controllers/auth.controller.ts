import { Request, Response } from 'express';

import { User, UserDocument } from '../model/User';
import { generateToken } from '../lib/jwt';

const sendResponseToken = ({
  user,
  res,
  statusCode,
}: {
  user: UserDocument;
  statusCode: number;
  res: Response;
}) => {
  const payload = {
    userId: user._id,
  };

  const secretKey = `${process.env.JWT_SECRET_KEY}`;
  const expiresIn = '7d';

  const token = generateToken(payload, secretKey, expiresIn);

  // remove password from response
  user.password = undefined;

  res.status(statusCode).json({ user, token });
};

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

    sendResponseToken({ user, res, statusCode: 201 });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Email or Password is incorrect.' });
    }

    const isPasswordMatch = user.matchesPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Email or Password is incorrect.' });
    }

    sendResponseToken({ user, res, statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};
