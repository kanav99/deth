import express from 'express';
import errorHandler from '@middleware/errorHandler';
import cors from 'cors';

import { uploadContract } from '@controller/contract';
import { getAbi } from '@controller/abi';
import { decodeRlpController } from '@controller/rlp';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.get('/health', (_req, res) => res.send('OK'));
  app.post('/contract', uploadContract);
  app.post('/abi', getAbi);
  app.post('/rlp', decodeRlpController);
  app.use(errorHandler);

  return app;
};

export { createServer };
