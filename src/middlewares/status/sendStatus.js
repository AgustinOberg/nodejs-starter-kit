import { StatusCodes } from 'http-status-codes';

export const sendStatus = (req, res) =>
  res.status(StatusCodes.OK).send(req.status);
