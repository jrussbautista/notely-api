import { Request, NextFunction, Response } from 'express';
import { Schema } from 'joi';

const validateRequest = (req: Request, res: Response, next: NextFunction, schema: Schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const errors = error.details.map((err) => ({ [err.path[0]]: err.message }));

    return res.status(422).json({
      message: 'The given data was invalid',
      errors,
    });
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
};

export default validateRequest;
