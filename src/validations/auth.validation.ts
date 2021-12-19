import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import validateRequest from '../utils/validate-request';

export const signUpValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  validateRequest(req, res, next, schema);
};

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  validateRequest(req, res, next, schema);
};
