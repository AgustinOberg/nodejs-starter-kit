import express from 'express';

import {
  validateFrom,
  validateName,
  validateStatus,
} from '@/middlewares/status/validations';

import mongoose from 'mongoose';
import runValidations from '@/middlewares/common/validations/runValidations';
import { createDbServer, getStatus, sendStatus } from '@/middlewares/status';

export const statusRouter = express.Router();
const checkValidations = runValidations([validateFrom]);
const serverValidations = runValidations([validateName, validateStatus]);

statusRouter.get('/', (_, res) =>
  res.json({
    server: 'ONLINE',
    database: {
      state: mongoose.connection.readyState,
      description: mongoose.connection.readyState === 1 ? 'ONLINE' : 'OFFLINE',
      environment: process.env.NODE_ENV,
    },
  })
);
statusRouter.post('/check', checkValidations, getStatus, sendStatus);
statusRouter.post('/dbServer', serverValidations, createDbServer);
