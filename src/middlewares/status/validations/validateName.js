import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../../models/server';
const { SERVER_NAME_NOT_FOUND, SERVER_NAME_TOO_SHORT, SERVER_NAME_TOO_LONG } =
  errorCodes;

export const validateName = check('name')
  .exists()
  .withMessage(SERVER_NAME_NOT_FOUND)
  .isLength({ min: NAME_MIN_LENGTH })
  .withMessage(SERVER_NAME_TOO_SHORT)
  .isLength({ max: NAME_MAX_LENGTH })
  .withMessage(SERVER_NAME_TOO_LONG);
