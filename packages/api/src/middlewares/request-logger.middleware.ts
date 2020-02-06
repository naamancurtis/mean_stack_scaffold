import { Router } from 'express';
import morgan from 'morgan';
import LoggerStream from '../utils/logger';

const requestLoggerMiddleware = (router: Router): void => {
  router.use(morgan('combined', { stream: LoggerStream }));
};

export default [requestLoggerMiddleware];
