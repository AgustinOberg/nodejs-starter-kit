import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';
const { STATUS_FROM_NOT_EXIST } = errorCodes;

export const validateFrom = check('from', STATUS_FROM_NOT_EXIST).exists();
