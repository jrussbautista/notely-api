import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import validateRequest from '../utils/validate-request';

export const taskValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean(),
  });

  validateRequest(req, res, next, schema);
};
