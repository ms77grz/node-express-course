const { CustomError } = require('../errors/custom-error');

module.exports = errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Ivalid ObjectId' });
};
