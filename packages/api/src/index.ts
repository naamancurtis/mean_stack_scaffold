import 'reflect-metadata';
import './controllers/main.controller';
import Server from './server';
import repo from './models/repo';

const server = new Server();

server.runApp(process.env.SERVER_PORT || 3000);
repo();
