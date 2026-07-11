const multer = require('multer');
const path = require('path');
const env = require('../config/env');
const { ERROR_CODES, HTTP_STATUS } = require('../constants/api');
const logger = require('../utils/logger');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['text/csv', 'text/plain', 'application/csv', 'application/vnd.ms-excel'];
  const hasCsvExtension = path.extname(file.originalname || '').toLowerCase() === '.csv';

  if (!allowedMimes.includes(file.mimetype) && !hasCsvExtension) {
    const error = new Error('Invalid file type. Only CSV files are allowed.');
    error.code = ERROR_CODES.INVALID_FILE_TYPE;
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    return cb(error);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE
  }
});

const uploadMiddleware = upload.single('file');

const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      logger.warn('File too large', { size: err.limit });
      const error = new Error(`File exceeds ${env.MAX_FILE_SIZE / 1024 / 1024}MB limit`);
      error.code = ERROR_CODES.FILE_TOO_LARGE;
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      return next(error);
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
      const error = new Error('Only one file is allowed');
      error.code = ERROR_CODES.INVALID_FILE_TYPE;
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      return next(error);
    }
  }

  if (err) {
    logger.error('Upload error', { message: err.message });
    err.statusCode = err.statusCode || HTTP_STATUS.BAD_REQUEST;
    return next(err);
  }

  next();
};

module.exports = {
  uploadMiddleware,
  uploadErrorHandler
};
