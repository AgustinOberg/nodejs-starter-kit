import { StatusCodes } from 'http-status-codes';

export const sendStatus = (req, res, next) => {
  res.status(StatusCodes.OK).send(req.status);
  next();
};
