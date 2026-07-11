const logger = require('../utils/logger');
const { HTTP_STATUS, ERROR_CODES } = require('../constants/api');

const errorHandler = (err, req, res, next) => {
  logger.error('Request error', {
    message: err.message,
    code: err.code,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method
  });

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const errorCode = err.code || ERROR_CODES.INTERNAL_ERROR;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message
    }
  });
};

module.exports = errorHandler;
