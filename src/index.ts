import { createServer } from '@config/express';
import http from 'http';
import { AddressInfo } from 'net';
import { example } from './dsl';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '6969';

const startServer = async () => {
  const app = await createServer();
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(
      `Server listening on ${addressInfo.address}:${addressInfo.port}`,
    );
  });
};

example();
startServer();
