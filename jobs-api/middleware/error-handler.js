const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };
  // duplicate error
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }
  // validation error
  if (err.name && err.name === 'ValidationError') {
    (customError.statusCode = StatusCodes.BAD_REQUEST),
      (customError.msg = Object.values(err.errors).map(
        item => `${item.message} for ${item.path} field`
      ));
  }
  // cast error
  if (err.name && err.name === 'CastError') {
    (customError.statusCode = StatusCodes.NOT_FOUND),
      (customError.msg = `No job with id ${err.value}`);
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
