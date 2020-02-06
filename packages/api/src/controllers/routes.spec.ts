import request from 'supertest';
import TestServer from '../utils/types/test-server.class';

describe('routes', () => {
  let server: TestServer;

  beforeEach(() => {
    server = new TestServer();
  });

  test('processes a valid GET request', async () => {
    const response = await request(server.app).get('/test');
    expect(response.status).toEqual(200);
  });

  test('redirects on an api docs request', async () => {
    const response = await request(server.app).get('/docs');
    expect(response.status).toEqual(301);
  });

  test('fails on a non-existing endpoint', async () => {
    const response = await request(server.app).get('/RANDOM_ENDPOINT');
    expect(response.status).toEqual(404);
  });
});
