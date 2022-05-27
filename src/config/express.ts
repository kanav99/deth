import express from 'express';
import errorHandler from '@middleware/errorHandler';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.json());
  app.get('/health', (_req, res) => res.send('OK'));

  app.use(errorHandler);

  return app;
};

export { createServer };
