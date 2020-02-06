import express, { Router } from 'express';

export type MiddlewareWrapper = (router: Router) => void;

const applyMiddleware = (
  middleware: MiddlewareWrapper[],
  router: Router
): void => middleware.forEach(handler => handler(router));

export function middlewareApplicator(
  app: express.Application,
  ...args: MiddlewareWrapper[][]
): express.Application {
  args.forEach(middleware => {
    applyMiddleware(middleware, app);
  });
  return app;
}
