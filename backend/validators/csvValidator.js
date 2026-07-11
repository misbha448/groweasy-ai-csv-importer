const { ERROR_CODES } = require('../constants/api');

const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: ERROR_CODES.MISSING_FILE, message: 'No file uploaded' };
  }

  const allowedMimes = ['text/csv', 'text/plain', 'application/csv', 'application/vnd.ms-excel'];
  const hasCsvExtension = String(file.originalname || '').toLowerCase().endsWith('.csv');
  if (!allowedMimes.includes(file.mimetype) && !hasCsvExtension) {
    return { valid: false, error: ERROR_CODES.INVALID_FILE_TYPE, message: 'Only CSV files are allowed' };
  }

  const env = require('../config/env');
  if (file.size > env.MAX_FILE_SIZE) {
    return { valid: false, error: ERROR_CODES.FILE_TOO_LARGE, message: `File exceeds ${env.MAX_FILE_SIZE / 1024 / 1024}MB limit` };
  }

  return { valid: true };
};

const validateCSVData = (records) => {
  if (!Array.isArray(records) || records.length === 0) {
    return { valid: false, error: ERROR_CODES.INVALID_CSV, message: 'No records found in CSV' };
  }

  return { valid: true };
};

const validateRequiredFields = (record) => {
  const hasEmail = record.email && record.email.trim() !== '';
  const hasMobile = record.mobile_without_country_code && record.mobile_without_country_code.trim() !== '';

  if (!hasEmail && !hasMobile) {
    return { valid: false, reason: 'Missing both email and mobile' };
  }

  return { valid: true };
};

module.exports = {
  validateFile,
  validateCSVData,
  validateRequiredFields
};
