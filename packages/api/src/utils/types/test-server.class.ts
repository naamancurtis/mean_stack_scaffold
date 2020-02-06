import Server from '../../server';

export default class TestServer extends Server {
  constructor() {
    super();
    process.env.NODE_ENV = 'test';
  }
}
