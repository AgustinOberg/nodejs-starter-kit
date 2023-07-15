import express from 'express';
import runValidations from '../middlewares/common/validations/runValidations';
import {
  validateFrom,
  validateName,
  validateStatus,
} from '../middlewares/status/validations';
import { createDbServer, getStatus, sendStatus } from '../middlewares/status';

export const statusRouter = express.Router();
const checkValidations = runValidations([validateFrom]);
const serverValidations = runValidations([validateName, validateStatus]);

statusRouter.post('/check', checkValidations, getStatus, sendStatus);
statusRouter.post('/dbServer', serverValidations, createDbServer);
