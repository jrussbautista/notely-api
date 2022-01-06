import jwt from 'jsonwebtoken';

export const generateToken = (
  payload: Record<string, any>,
  key: string,
  expiresIn: string = '1h'
) => {
  const token = jwt.sign(payload, key, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (token: string, key: string) => {
  return jwt.verify(token, key);
};
