import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';
const { SERVER_STATUS_MUST_BE_BOOLEAN } = errorCodes;

export const validateStatus = check('status')
  .optional()
  .isBoolean()
  .withMessage(SERVER_STATUS_MUST_BE_BOOLEAN);
