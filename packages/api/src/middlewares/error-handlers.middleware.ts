import { Request, Response, NextFunction, Router } from 'express';
import * as ErrorHandler from '../utils/error-handler';

const handle404Error = (router: Router): void => {
  router.use((_: Error, __: Request, ___: Response, ____: NextFunction) => {
    ErrorHandler.notFoundError();
  });
};

const handleClientErrors = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerErrors = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleServerErrors, handleClientErrors];
