import { Request, Response, NextFunction } from 'express';
import { User } from '../model/User';
import { verifyToken } from '../lib/jwt';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const decoded = verifyToken(token, `${process.env.JWT_SECRET_KEY}`) as { userId: string };

  const user = await User.findById(decoded.userId);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  req.user = user;
  res.locals.user = user;
  next();
};
