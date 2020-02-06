// Reflect Metadata must be imported first
import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Application } from 'express';

// Import Middleware
import requestLoggerMiddleware from './middlewares/request-logger.middleware';
import middleware from './middlewares';
import errorHandlers from './middlewares/error-handlers.middleware';

// Import Services
import MainService from './services/main.service';
import SERVICES from './services/types.service';

// Import Controllers
import './controllers/main.controller';
import { middlewareApplicator } from './middlewares/utils.middleware';

export default class Server {
  public app: Application;

  constructor() {
    const container = new Container();
    container.bind<MainService>(SERVICES.MainService).to(MainService);

    const server = new InversifyExpressServer(container);

    server.setConfig(app => {
      middlewareApplicator(
        app,
        requestLoggerMiddleware,
        middleware,
        errorHandlers
      );
    });

    this.app = server.build();
  }

  public runApp(port: number | string): void {
    this.app.listen(port);
  }
}
