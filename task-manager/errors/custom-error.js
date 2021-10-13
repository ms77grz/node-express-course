class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const customError = (message, status) => {
  return new CustomError(message, status);
};

module.exports = { customError, CustomError };
