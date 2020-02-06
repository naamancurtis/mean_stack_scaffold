import { Response, NextFunction } from 'express';
import { HTTP404Error } from './types/errors/http-4xx.error';
import HTTPClientError from './types/errors/http-client.abstract';

export const notFoundError = (): void => {
  throw new HTTP404Error('Method not found');
};

export const clientError = (
  err: Error,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof HTTPClientError) {
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (
  err: Error,
  res: Response,
  _: NextFunction
): void => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};
