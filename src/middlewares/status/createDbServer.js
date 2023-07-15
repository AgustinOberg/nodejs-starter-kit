import { StatusCodes } from 'http-status-codes';
import { create } from '../../services/serverService';

export const createDbServer = async (req, res, next) => {
  try {
    const newServer = await create(req.body);
    res.status(StatusCodes.CREATED).send(newServer);
  } catch (error) {
    return next(error);
  }
};
