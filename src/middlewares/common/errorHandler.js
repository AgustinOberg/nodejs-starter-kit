import { StatusCodes } from 'http-status-codes';

const errors = {
  UNAUTHORIZED: 'UnauthorizedError',
};

const errorHandler = (error, req, res, next) => {
  if (error.name === errors.UNAUTHORIZED) {
    const errorResponse = {
      ...error,
      ...{ message: error?.message || error?.inner?.message },
    };
    res.status(StatusCodes.UNAUTHORIZED).send(errorResponse);
    return next();
  }
  // TODO: status code error as parameter
  const fullError = error?.message ? error : { message: error };
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(fullError);
  return next();
};

export default errorHandler;
